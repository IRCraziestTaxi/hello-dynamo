import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DatabaseModule } from "../database/database.module";
import { ConnoisseurController } from "./connoisseur.controller";
import { ConnoisseurService } from "./connoisseur.service";

@Module({
    imports: [
        CqrsModule,
        DatabaseModule
    ],
    providers: [ConnoisseurService],
    controllers: [ConnoisseurController]
})
export class ConnoisseurModule {}
