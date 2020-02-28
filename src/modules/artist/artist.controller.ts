import { Controller } from "@nestjs/common";
import { CommandResultController } from "@responsekit/express";

@Controller("artists")
export class ArtistController extends CommandResultController { }
