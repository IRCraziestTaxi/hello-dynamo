import { dynamoMapper, getMigrations } from "./migration-runner.base";
import { migrations } from "./migration.constants";
import { IMigration } from "./migration.interface";

export async function revertMigration(): Promise<void> {
    const migrationRecords = await getMigrations();

    let migrationToRevert: IMigration = null;

    do {
        migrationToRevert = migrations.pop();
    } while (
        !migrationRecords.some(mr => mr.name === migrationToRevert.name)
        && migrations.length
    );

    if (!migrationToRevert) {
        throw new Error("Could not find a migration to revert.");
    }

    console.log(`Modifying table(s) for reverting migration ${migrationToRevert.name}.`);

    await migrationToRevert.down(dynamoMapper);

    const migrationRecordToDelete = migrationRecords.find(mr => mr.name === migrationToRevert.name);

    console.log(`Removing record for migration ${migrationToRevert.name}.`);

    await dynamoMapper.delete(migrationRecordToDelete);

    console.log(`Successfully reverted migration ${migrationToRevert.name}.`);
}

revertMigration().catch(error => {
    console.error("An error occurred while reverting last migration.");
    console.error(error.message);
});
