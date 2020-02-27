import { IDatabaseRecord } from "@domain/interfaces";

export interface IConnoisseur extends IDatabaseRecord {
    nickname: string;
    started: Date;
}

