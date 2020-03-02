import { MigrationRecord } from "./migration-record.entity";
import { dynamoMapper, getMigrations } from "./migration-runner.base";
import { migrations, migrationsTablePrimaryIdValue } from "./migration.constants";

export async function runMigrations(): Promise<void> {
    const migrationRecords = await getMigrations();

    for (const migration of migrations) {
        if (migrationRecords.some(mr => mr.name === migration.name)) {
            continue;
        }

        console.log(`Modifying table(s) for running migration ${migration.name}.`);

        await migration.up(dynamoMapper);

        const newMigrationRecord = new MigrationRecord();
        newMigrationRecord.primaryId = migrationsTablePrimaryIdValue;
        newMigrationRecord.name = migration.name;

        console.log(`Adding record for migration ${migration.name}.`);

        await dynamoMapper.put(newMigrationRecord);

        console.log(`Successfully ran migration ${migration.name}.`);
    }
}

runMigrations().catch(error => {
    console.error("An error occurred while running migrations.");
    console.error(error.message);
});
