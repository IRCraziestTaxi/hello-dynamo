import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";
import { config } from "dotenv";
import { MigrationRecord } from "./migration-record.entity";
import { migrationsTablePrimaryIdValue } from "./migration.constants";

// TODO: Eventually leverage a migration-record.entity.ts and migration-record.service.ts
// along with migration classes to automate migrations. For now, just create the table.

// Load env variables.
config();

const dynamo = new DynamoDB({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
    region: process.env.AWS_REGION
});

export const dynamoMapper = new DataMapper({
    client: dynamo
});

export async function getMigrations(): Promise<MigrationRecord[]> {
    await dynamoMapper.ensureTableExists(
        MigrationRecord,
        {
            readCapacityUnits: 1,
            writeCapacityUnits: 1
        }
    );

    const migrationRecords = dynamoMapper.query(
        MigrationRecord,
        {
            primaryId: migrationsTablePrimaryIdValue
        }
    );

    // Is there really no better way to get values from QueryIterator<>?
    const migrationRecordsIterated: MigrationRecord[] = [];

    for await (const migrationRecord of migrationRecords) {
        migrationRecordsIterated.push(migrationRecord);
    }

    return migrationRecordsIterated;
}
