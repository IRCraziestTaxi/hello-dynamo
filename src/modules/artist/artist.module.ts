import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DatabaseModule } from "../database/database.module";
import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";

@Module({
    imports: [
        CqrsModule,
        DatabaseModule
    ],
    providers: [ArtistService],
    controllers: [ArtistController]
})
export class ArtistModule {}
