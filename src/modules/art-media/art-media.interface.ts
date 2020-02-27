import { IDatabaseRecord } from "@domain/interfaces";

export interface IArtMedia extends IDatabaseRecord {
    description: string;
    name: string;
}
