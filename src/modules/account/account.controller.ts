import { Controller, Post, Body, Res, Get, Param } from "@nestjs/common";
import { CommandResultController } from "@responsekit/express";
import { AccountService } from "./account.service";
import { AddAccountCommand } from "./commands/add-account/add-account.command";
import { Response } from "express";
import { AddConnoisseurCommand } from "./commands/add-connoisseur/add-connoisseur.command";
import { AddArtistCommand } from "./commands/add-artist/add-artist.command";
import { GetAccountQuery } from "./queries/get-account/get-account.query";

@Controller("accounts")
export class AccountController extends CommandResultController {
    public constructor(
        private readonly _accountService: AccountService
    ) {
        super();
    }

    @Post()
    public async addAccount(
        @Body()
            command: AddAccountCommand,
        @Res()
            response: Response
    ): Promise<Response> {
        const addResult = await this._accountService.send(command);

        return this.sendResponse(addResult, response);
    }

    @Post(":primaryId/artist")
    public async addArtist(
        @Param("primaryId")
            primaryId: string,
        @Body()
            command: AddArtistCommand,
        @Res()
            response: Response
    ): Promise<Response> {
        command.primaryId = primaryId;
        const addResult = await this._accountService.send(command);

        return this.sendResponse(addResult, response);
    }

    @Post(":primaryId/connoisseur")
    public async addConnoisseur(
        @Param("primaryId")
            primaryId: string,
        @Body()
            command: AddConnoisseurCommand,
        @Res()
            response: Response
    ): Promise<Response> {
        command.primaryId = primaryId;
        const addResult = await this._accountService.send(command);

        return this.sendResponse(addResult, response);
    }

    @Get(":primaryId")
    public async getAccount(
        @Param("primaryId")
            primaryId: string,
        @Res()
            response: Response
    ): Promise<Response> {
        const getResult = await this._accountService.query(new GetAccountQuery(primaryId));

        return this.sendResponse(getResult, response);
    }
}
