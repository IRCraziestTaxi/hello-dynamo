import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DatabaseModule } from "../database/database.module";
import { ArtPieceController } from "./art-piece.controller";
import { ArtPieceService } from "./art-piece.service";

@Module({
    imports: [
        CqrsModule,
        DatabaseModule
    ],
    providers: [ArtPieceService],
    controllers: [ArtPieceController]
})
export class ArtPieceModule {}
