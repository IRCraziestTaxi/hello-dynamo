import { Test, TestingModule } from "@nestjs/testing";
import { ArtMediaService } from "./art-media.service";

describe("ArtMediaService", () => {
    let service: ArtMediaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ArtMediaService]
        }).compile();

        service = module.get<ArtMediaService>(ArtMediaService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
