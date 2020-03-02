import { hashKey, rangeKey, table } from "@aws/dynamodb-data-mapper-annotations";
import { TABLE_NAME_MIGRATION_RECORDS } from "@domain/constants/entity.constants";
import { MigrationsTablePrimaryIdValue } from "./migration.types";

@table(TABLE_NAME_MIGRATION_RECORDS)
export class MigrationRecord {
    @hashKey()
    public primaryId: MigrationsTablePrimaryIdValue;

    @rangeKey()
    public name: string;
}
