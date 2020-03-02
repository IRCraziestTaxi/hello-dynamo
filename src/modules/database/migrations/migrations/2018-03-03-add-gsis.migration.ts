import { DataMapper } from "@aws/dynamodb-data-mapper";
import { GSI_ARTPIECE_BY_ARTIST_LOOKUP, GSI_ARTREVIEW_BY_ARTPIECE_LOOKUP, GSI_ARTREVIEW_BY_CONNOISSEUR_LOOKUP } from "@domain/constants/index.constants";
import { DatabaseRecord } from "@domain/entities";
import { IMigration } from "../migration.interface";

export class AddGsis implements IMigration {
    public get name(): string {
        return "2018-03-03-Add-Gsis";
    }

    public async up(dynamoMapper: DataMapper): Promise<void> {
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

    public async down(dynamoMapper: DataMapper): Promise<void> {
        await dynamoMapper.ensureTableExists(
            DatabaseRecord,
            {
                readCapacityUnits: parseInt(process.env.DYNAMO_TABLE_READ_CAPACITY_UNITS),
                writeCapacityUnits: parseInt(process.env.DYNAMO_TABLE_WRITE_CAPACITY_UNITS)
            }
        );
    }
}
