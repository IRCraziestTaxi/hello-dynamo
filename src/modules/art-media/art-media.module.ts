import { Module } from "@nestjs/common";
import { ArtMediaService } from "./art-media.service";
import { ArtMediaController } from "./art-media.controller";

@Module({
    providers: [ArtMediaService],
    controllers: [ArtMediaController]
})
export class ArtMediaModule {}
