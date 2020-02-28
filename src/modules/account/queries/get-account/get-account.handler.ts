import { KEY_PREFIX_ARTIST, KEY_PREFIX_CONNOISSEUR } from "@domain/constants/key.constants";
import { AccountDto, ArtistDto, ConnoisseurDto } from "@domain/DTOs";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CommandResult, GenericResponse, Rejection } from "@responsekit/core";
import { DatabaseService } from "@services/database";
import { Mapper } from "ts-simple-automapper";
import { GetAccountQuery } from "./get-account.query";

@QueryHandler(GetAccountQuery)
export class GetAccountHandler implements IQueryHandler<GetAccountQuery> {
    public constructor(
        private readonly _databaseService: DatabaseService
    ) { }

    public async execute(query: GetAccountQuery): Promise<CommandResult<AccountDto>> {
        try {
            if (!query.primaryId) {
                return Rejection.BadRequest("Invalid primary ID.");
            }

            const accountRecords = this._databaseService.query({
                primaryId: query.primaryId
            });

            let accountDto: AccountDto = null;
            let artistDto: ArtistDto = null;
            let connoisseurDto: ConnoisseurDto = null;

            const mapper = new Mapper();

            for await (const record of accountRecords) {
                if (record.secondaryId.startsWith(KEY_PREFIX_ARTIST)) {
                    artistDto = mapper.map(record, new ArtistDto());

                    continue;
                }

                if (record.secondaryId.startsWith(KEY_PREFIX_CONNOISSEUR)) {
                    connoisseurDto = mapper.map(record, new ConnoisseurDto());

                    continue;
                }

                accountDto = mapper.map(record, new AccountDto());
            }

            if (accountDto) {
                accountDto.artist = artistDto;
                accountDto.connoisseur = connoisseurDto;
            }

            return new GenericResponse({
                value: accountDto
            });
        }
        catch (error) {
            return new Rejection(error);
        }
    }
}
