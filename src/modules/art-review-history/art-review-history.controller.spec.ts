import { Test, TestingModule } from "@nestjs/testing";
import { ArtReviewHistoryController } from "./art-review-history.controller";

describe("ArtReviewHistory Controller", () => {
    let controller: ArtReviewHistoryController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ArtReviewHistoryController]
        }).compile();

        controller = module.get<ArtReviewHistoryController>(ArtReviewHistoryController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
