import { Module } from "@nestjs/common";
import { ConnoisseurService } from "./connoisseur.service";
import { ConnoisseurController } from "./connoisseur.controller";

@Module({
    providers: [ConnoisseurService],
    controllers: [ConnoisseurController]
})
export class ConnoisseurModule {}
