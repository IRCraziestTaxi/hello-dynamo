import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DatabaseRecord } from "@domain/entities";
import { IMigration } from "../migration.interface";

export class Initial implements IMigration {
    public get name(): string {
        return "2018-03-02-Initial";
    }

    public async up(dynamoMapper: DataMapper): Promise<void> {
        await dynamoMapper.createTable(
            DatabaseRecord,
            {
                readCapacityUnits: parseInt(process.env.DYNAMO_TABLE_READ_CAPACITY_UNITS),
                writeCapacityUnits: parseInt(process.env.DYNAMO_TABLE_WRITE_CAPACITY_UNITS)
            }
        );
    }

    public async down(dynamoMapper: DataMapper): Promise<void> {
        await dynamoMapper.deleteTable(DatabaseRecord);
    }
}
