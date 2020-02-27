import { Test, TestingModule } from "@nestjs/testing";
import { ArtReviewController } from "./art-review.controller";

describe("ArtReview Controller", () => {
    let controller: ArtReviewController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ArtReviewController]
        }).compile();

        controller = module.get<ArtReviewController>(ArtReviewController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
