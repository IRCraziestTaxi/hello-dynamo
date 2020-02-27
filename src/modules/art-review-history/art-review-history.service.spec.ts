import { Test, TestingModule } from "@nestjs/testing";
import { ArtReviewHistoryService } from "./art-review-history.service";

describe("ArtReviewHistoryService", () => {
    let service: ArtReviewHistoryService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ArtReviewHistoryService]
        }).compile();

        service = module.get<ArtReviewHistoryService>(ArtReviewHistoryService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
