import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DatabaseModule } from "../database/database.module";
import { ArtReviewHistoryController } from "./art-review-history.controller";
import { ArtReviewHistoryService } from "./art-review-history.service";

@Module({
    imports: [
        CqrsModule,
        DatabaseModule
    ],
    providers: [ArtReviewHistoryService],
    controllers: [ArtReviewHistoryController]
})
export class ArtReviewHistoryModule {}
