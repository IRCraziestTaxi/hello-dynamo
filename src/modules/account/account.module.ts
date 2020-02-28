import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DatabaseModule } from "../database/database.module";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { AddAccountHandler } from "./commands/add-account/add-account.handler";
import { AddArtistHandler } from "./commands/add-artist/add-artist.handler";
import { AddConnoisseurHandler } from "./commands/add-connoisseur/add-connoisseur.handler";
import { GetAccountHandler } from "./queries/get-account/get-account.handler";

@Module({
    imports: [
        CqrsModule,
        DatabaseModule
    ],
    providers: [
        AccountService,
        // Command handlers.
        AddAccountHandler,
        AddArtistHandler,
        AddConnoisseurHandler,
        // Query handlers.
        GetAccountHandler
    ],
    controllers: [
        AccountController
    ]
})
export class AccountModule {}
