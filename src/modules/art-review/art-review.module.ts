import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DatabaseModule } from "../database/database.module";
import { ArtReviewController } from "./art-review.controller";
import { ArtReviewService } from "./art-review.service";

@Module({
    imports: [
        CqrsModule,
        DatabaseModule
    ],
    providers: [ArtReviewService],
    controllers: [ArtReviewController]
})
export class ArtReviewModule {}
