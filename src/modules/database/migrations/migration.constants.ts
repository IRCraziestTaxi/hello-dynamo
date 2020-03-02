import { IMigration } from "./migration.interface";
import { Initial } from "./migrations/2018-03-02-initial.migration";
import { MigrationsTablePrimaryIdValue } from "./migration.types";

export const migrations: IMigration[] = [
    new Initial()
];

export const migrationsTablePrimaryIdValue: MigrationsTablePrimaryIdValue = "migrations";
