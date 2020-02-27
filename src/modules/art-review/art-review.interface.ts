import { IDatabaseRecord } from "@domain/interfaces";

export interface IArtReview extends IDatabaseRecord {
    artpieceId: string;
    authored: Date;
    connoisseurId: string;
    notes: string;
    rating: number;
    title: string;
}
