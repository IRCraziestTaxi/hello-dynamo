import { Controller } from "@nestjs/common";
import { CommandResultController } from "@responsekit/express";

@Controller("art-media")
export class ArtMediaController extends CommandResultController { }
