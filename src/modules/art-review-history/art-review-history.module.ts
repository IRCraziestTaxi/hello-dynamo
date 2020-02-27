import { Module } from "@nestjs/common";
import { ArtReviewHistoryService } from "./art-review-history.service";
import { ArtReviewHistoryController } from "./art-review-history.controller";

@Module({
    providers: [ArtReviewHistoryService],
    controllers: [ArtReviewHistoryController]
})
export class ArtReviewHistoryModule {}
