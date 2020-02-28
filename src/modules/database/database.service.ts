import { DataMapper, QueryIterator, QueryOptions } from "@aws/dynamodb-data-mapper";
import { ConditionExpressionPredicate } from "@aws/dynamodb-expressions";
import { DatabaseRecord } from "@domain/entities";
import { IDatabaseRecord } from "@domain/interfaces";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DynamoDB } from "aws-sdk";

type ComparableType = string | number | boolean | Date;

// TODO: Make this service generic and create database-record.service.ts
// (and eventually migration-record.service.ts) to wrap or extend it.
@Injectable()
export class DatabaseService {
    private readonly _dynamo: DynamoDB;
    private readonly _dynamoMapper: DataMapper;

    public constructor(
        private readonly _configService: ConfigService
    ) {
        this._dynamo = new DynamoDB({
            accessKeyId: this._configService.get<string>("AWS_ACCESS_KEY"),
            secretAccessKey: this._configService.get<string>("AWS_ACCESS_SECRET_KEY"),
            region: this._configService.get<string>("AWS_REGION")
        });
        this._dynamoMapper = new DataMapper({
            client: this._dynamo
        });
    }

    // Take a Partial so we only have to query by hash and range keys.
    public async get(queryRecord: DatabaseRecord): Promise<DatabaseRecord> {
        return this._dynamoMapper.get(queryRecord);
    }

    public async put(record: DatabaseRecord): Promise<DatabaseRecord> {
        return this._dynamoMapper.put(record);
    }

    public query(
        keyCondition: {
            [key in keyof IDatabaseRecord]?: ComparableType | ConditionExpressionPredicate
        },
        queryOptions?: QueryOptions
    ): QueryIterator<DatabaseRecord> {
        return this._dynamoMapper.query(
            DatabaseRecord,
            keyCondition,
            queryOptions
        );
    }
}
