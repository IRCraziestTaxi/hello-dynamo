import { KEY_POSTFIX_METADATA, KEY_PREFIX_ACCOUNT } from "@domain/constants/key.constants";
import { DatabaseRecord } from "@domain/entities";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CommandResult, GenericResponse, Rejection } from "@responsekit/core";
import { DatabaseService } from "@services/database";
import { Mapper } from "ts-simple-automapper";
import { AddAccountCommand } from "./add-account.command";

@CommandHandler(AddAccountCommand)
export class AddAccountHandler implements ICommandHandler<AddAccountCommand> {
    public constructor(
        private readonly _databaseService: DatabaseService
    ) { }

    public async execute(command: AddAccountCommand): Promise<CommandResult<string>> {
        try {
            const accountRecords = this._databaseService.query({
                primaryId: command.email
            });

            // Is there really no better way to check for existence of any results in this QueryIterator crap?
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            for await (const existingAccountRecord of accountRecords) {
                return Rejection.BadRequest("An account with that email already exists.");
            }

            const newAccountRecord = new Mapper().map(command, new DatabaseRecord());
            newAccountRecord.secondaryId = `${KEY_PREFIX_ACCOUNT}${KEY_POSTFIX_METADATA}`;

            await this._databaseService.put(newAccountRecord);

            return new GenericResponse({
                value: newAccountRecord.primaryId
            });
        }
        catch (error) {
            return new Rejection(error);
        }
    }
}
