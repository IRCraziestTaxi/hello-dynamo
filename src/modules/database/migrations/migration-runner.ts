import { DataMapper } from "@aws/dynamodb-data-mapper";
import { GSI_ARTPIECE_BY_ARTIST_LOOKUP, GSI_ARTREVIEW_BY_ARTPIECE_LOOKUP, GSI_ARTREVIEW_BY_CONNOISSEUR_LOOKUP } from "@domain/constants/index.constants";
import { DatabaseRecord } from "@domain/entities";
import { DynamoDB } from "aws-sdk";
import { config } from "dotenv";

// TODO: Eventually leverage a migration-record.entity.ts and migration-record.service.ts
// along with migration classes to automate migrations. For now, just create the table.

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

// Create our table.
dynamoMapper.createTable(
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
