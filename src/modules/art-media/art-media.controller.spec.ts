import { Test, TestingModule } from "@nestjs/testing";
import { ArtMediaController } from "./art-media.controller";

describe("ArtMedia Controller", () => {
    let controller: ArtMediaController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ArtMediaController]
        }).compile();

        controller = module.get<ArtMediaController>(ArtMediaController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
