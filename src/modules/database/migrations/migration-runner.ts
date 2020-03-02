import { DataMapper } from "@aws/dynamodb-data-mapper";
import { GSI_ARTPIECE_BY_ARTIST_LOOKUP, GSI_ARTREVIEW_BY_ARTPIECE_LOOKUP, GSI_ARTREVIEW_BY_CONNOISSEUR_LOOKUP } from "@domain/constants/index.constants";
import { DatabaseRecord } from "@domain/entities";
import { DynamoDB } from "aws-sdk";
import { config } from "dotenv";

// Note: Migrations are not really possible with DynamoDB.
// createTable/ensureTableExists wants options for indexes defined on the entity,
// so theoretical "previous migrations" where an index was previously not defined
// will fail to run because the options were not specified for that migration.
// Just use this file to update the table with index options specified as they change.

// Load env variables.
config();

const dynamo = new DynamoDB({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
    region: process.env.AWS_REGION
});

const dynamoMapper = new DataMapper({
    client: dynamo
});

async function migrateTable(): Promise<void> {
    console.log("Creating/updating table.");

    await dynamoMapper.ensureTableExists(
        DatabaseRecord,
        {
            readCapacityUnits: parseInt(process.env.DYNAMO_TABLE_READ_CAPACITY_UNITS),
            writeCapacityUnits: parseInt(process.env.DYNAMO_TABLE_WRITE_CAPACITY_UNITS),
            indexOptions: {
                [GSI_ARTPIECE_BY_ARTIST_LOOKUP]: {
                    type: "global",
                    projection: "all",
                    readCapacityUnits: parseInt(process.env.DYNAMO_INDEX_READ_CAPACITY_UNITS),
                    writeCapacityUnits: parseInt(process.env.DYNAMO_INDEX_WRITE_CAPACITY_UNITS)
                },
                [GSI_ARTREVIEW_BY_ARTPIECE_LOOKUP]: {
                    type: "global",
                    projection: "all",
                    readCapacityUnits: parseInt(process.env.DYNAMO_INDEX_READ_CAPACITY_UNITS),
                    writeCapacityUnits: parseInt(process.env.DYNAMO_INDEX_WRITE_CAPACITY_UNITS)
                },
                [GSI_ARTREVIEW_BY_CONNOISSEUR_LOOKUP]: {
                    type: "global",
                    projection: "all",
                    readCapacityUnits: parseInt(process.env.DYNAMO_INDEX_READ_CAPACITY_UNITS),
                    writeCapacityUnits: parseInt(process.env.DYNAMO_INDEX_WRITE_CAPACITY_UNITS)
                }
            }
        }
    );
}

// Create or update our table.
migrateTable().catch(error => {
    console.error("An error occurred while creating/updating table.");
    console.error(error.message);
});
