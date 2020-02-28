import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DatabaseModule } from "../database/database.module";
import { ArtMediaController } from "./art-media.controller";
import { ArtMediaService } from "./art-media.service";

@Module({
    imports: [
        CqrsModule,
        DatabaseModule
    ],
    providers: [ArtMediaService],
    controllers: [ArtMediaController]
})
export class ArtMediaModule {}
