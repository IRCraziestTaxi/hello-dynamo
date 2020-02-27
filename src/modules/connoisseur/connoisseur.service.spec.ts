import { Test, TestingModule } from "@nestjs/testing";
import { ConnoisseurService } from "./connoisseur.service";

describe("ConnoisseurService", () => {
    let service: ConnoisseurService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ConnoisseurService]
        }).compile();

        service = module.get<ConnoisseurService>(ConnoisseurService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
