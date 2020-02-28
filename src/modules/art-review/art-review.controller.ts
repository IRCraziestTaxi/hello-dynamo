import { Controller } from "@nestjs/common";
import { CommandResultController } from "@responsekit/express";

@Controller("art-reviews")
export class ArtReviewController extends CommandResultController { }
