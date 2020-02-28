import { Controller } from "@nestjs/common";
import { CommandResultController } from "@responsekit/express";

@Controller("art-pieces")
export class ArtPieceController extends CommandResultController { }
