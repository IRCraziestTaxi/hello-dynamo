import { DataMapper } from "@aws/dynamodb-data-mapper";

export interface IMigration {
    name: string;
    down(dynamoMapper: DataMapper): Promise<void>;
    up(dynamoMapper: DataMapper): Promise<void>;
}
