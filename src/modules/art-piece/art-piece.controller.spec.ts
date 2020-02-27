import { Test, TestingModule } from "@nestjs/testing";
import { ArtPieceController } from "./art-piece.controller";

describe("ArtPiece Controller", () => {
    let controller: ArtPieceController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ArtPieceController]
        }).compile();

        controller = module.get<ArtPieceController>(ArtPieceController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
