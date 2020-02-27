import { Module } from "@nestjs/common";
import { ArtPieceService } from "./art-piece.service";
import { ArtPieceController } from "./art-piece.controller";

@Module({
    providers: [ArtPieceService],
    controllers: [ArtPieceController]
})
export class ArtPieceModule {}
