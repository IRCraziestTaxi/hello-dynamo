import { Controller } from "@nestjs/common";
import { CommandResultController } from "@responsekit/express";

@Controller("art-review-history")
export class ArtReviewHistoryController extends CommandResultController { }
