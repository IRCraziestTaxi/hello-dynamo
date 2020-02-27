import { IDatabaseRecord } from "@domain/interfaces";

export interface IAccount extends IDatabaseRecord {
    username: string;
}
