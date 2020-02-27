import { IDatabaseRecord } from "@domain/interfaces";

export interface IArtist extends IDatabaseRecord {
    nickname: string;
    started: Date;
}
