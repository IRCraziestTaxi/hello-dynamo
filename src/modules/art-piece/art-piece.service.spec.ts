import { Test, TestingModule } from "@nestjs/testing";
import { ArtPieceService } from "./art-piece.service";

describe("ArtPieceService", () => {
    let service: ArtPieceService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ArtPieceService]
        }).compile();

        service = module.get<ArtPieceService>(ArtPieceService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
