import { Controller } from "@nestjs/common";
import { CommandResultController } from "@responsekit/express";

@Controller("connoisseurs")
export class ConnoisseurController extends CommandResultController { }
