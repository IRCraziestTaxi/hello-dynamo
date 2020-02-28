import { KEY_POSTFIX_METADATA, KEY_PREFIX_CONNOISSEUR } from "@domain/constants/key.constants";
import { DatabaseRecord } from "@domain/entities";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CommandResult, GenericResponse, Rejection } from "@responsekit/core";
import { DatabaseService } from "@services/database";
import nanoid from "nanoid";
import { Mapper } from "ts-simple-automapper";
import { AddConnoisseurCommand } from "./add-connoisseur.command";

@CommandHandler(AddConnoisseurCommand)
export class AddConnoisseurHandler implements ICommandHandler<AddConnoisseurCommand> {
    public constructor(
        private readonly _databaseService: DatabaseService
    ) { }

    public async execute(command: AddConnoisseurCommand): Promise<CommandResult<string>> {
        try {
            const accountRecords = this._databaseService.query({
                primaryId: command.primaryId
            });

            // Is there really no better way to check for existence of any results in this QueryIterator crap?
            let accountExists = false;

            // Is there a better way to do this? This Interator<> business is weird...
            for await (const record of accountRecords) {
                if (record.secondaryId.startsWith(KEY_PREFIX_CONNOISSEUR)) {
                    return Rejection.BadRequest("That account already has a connoisseur profile.");
                }

                accountExists = true;
            }

            if (!accountExists) {
                return Rejection.NotFound("Could not find account.");
            }

            const mapper = new Mapper();

            // Add the connoisseur record associated with the account.
            const accountConnoisseurRecord = mapper.map(command, new DatabaseRecord());
            accountConnoisseurRecord.secondaryId = `${KEY_PREFIX_CONNOISSEUR}${nanoid()}`;
            accountConnoisseurRecord.started = new Date();

            await this._databaseService.put(accountConnoisseurRecord);

            // Add the standalone connoisseur record.
            const newConnoisseurRecord = mapper.map(accountConnoisseurRecord, new DatabaseRecord());
            newConnoisseurRecord.primaryId = accountConnoisseurRecord.secondaryId;
            newConnoisseurRecord.secondaryId = `${KEY_PREFIX_CONNOISSEUR}${KEY_POSTFIX_METADATA}`;

            await this._databaseService.put(newConnoisseurRecord);

            return new GenericResponse({
                value: newConnoisseurRecord.primaryId
            });
        }
        catch (error) {
            return new Rejection(error);
        }
    }
}
