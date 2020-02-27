import { Module } from "@nestjs/common";
import { ArtReviewService } from "./art-review.service";
import { ArtReviewController } from "./art-review.controller";

@Module({
    providers: [ArtReviewService],
    controllers: [ArtReviewController]
})
export class ArtReviewModule {}
