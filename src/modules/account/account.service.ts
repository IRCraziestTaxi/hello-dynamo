import { CommandResultService } from "@domain/common/services/command-result.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccountService extends CommandResultService { }
