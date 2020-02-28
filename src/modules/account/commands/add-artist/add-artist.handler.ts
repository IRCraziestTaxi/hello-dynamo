import { KEY_POSTFIX_METADATA, KEY_PREFIX_ARTIST } from "@domain/constants/key.constants";
import { DatabaseRecord } from "@domain/entities";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CommandResult, GenericResponse, Rejection } from "@responsekit/core";
import { DatabaseService } from "@services/database";
import nanoid from "nanoid";
import { Mapper } from "ts-simple-automapper";
import { AddArtistCommand } from "./add-artist.command";

@CommandHandler(AddArtistCommand)
export class AddArtistHandler implements ICommandHandler<AddArtistCommand> {
    public constructor(
        private readonly _databaseService: DatabaseService
    ) { }

    public async execute(command: AddArtistCommand): Promise<CommandResult<string>> {
        try {
            const accountRecords = this._databaseService.query({
                primaryId: command.primaryId
            });

            // Is there really no better way to check for existence of any results in this QueryIterator crap?
            let accountExists = false;

            // Is there a better way to do this? This QueryIterator<> business is weird...
            for await (const record of accountRecords) {
                if (record.secondaryId.startsWith(KEY_PREFIX_ARTIST)) {
                    return Rejection.BadRequest("That account already has an artist profile.");
                }

                accountExists = true;
            }

            if (!accountExists) {
                return Rejection.NotFound("Could not find account.");
            }

            const mapper = new Mapper();

            // Add the artist record associated with the account.
            const accountArtistRecord = mapper.map(command, new DatabaseRecord());
            accountArtistRecord.secondaryId = `${KEY_PREFIX_ARTIST}${nanoid()}`;
            accountArtistRecord.started = new Date();

            await this._databaseService.put(accountArtistRecord);

            // Add the standalone artist record.
            const newArtistRecord = mapper.map(accountArtistRecord, new DatabaseRecord());
            newArtistRecord.primaryId = accountArtistRecord.secondaryId;
            newArtistRecord.secondaryId = `${KEY_PREFIX_ARTIST}${KEY_POSTFIX_METADATA}`;

            await this._databaseService.put(newArtistRecord);

            return new GenericResponse({
                value: newArtistRecord.primaryId
            });
        }
        catch (error) {
            return new Rejection(error);
        }
    }
}
