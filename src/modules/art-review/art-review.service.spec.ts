import { Test, TestingModule } from "@nestjs/testing";
import { ArtReviewService } from "./art-review.service";

describe("ArtReviewService", () => {
    let service: ArtReviewService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ArtReviewService]
        }).compile();

        service = module.get<ArtReviewService>(ArtReviewService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
