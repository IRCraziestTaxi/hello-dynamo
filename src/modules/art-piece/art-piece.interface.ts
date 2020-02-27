import { IDatabaseRecord } from "@domain/interfaces";

export interface IArtPiece extends IDatabaseRecord {
    artistId: string;
    completed: Date;
    description: string;
    title: string;
}
