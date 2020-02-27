import { Test, TestingModule } from "@nestjs/testing";
import { ConnoisseurController } from "./connoisseur.controller";

describe("Connoisseur Controller", () => {
    let controller: ConnoisseurController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ConnoisseurController]
        }).compile();

        controller = module.get<ConnoisseurController>(ConnoisseurController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
