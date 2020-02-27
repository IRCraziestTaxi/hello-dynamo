import { IDatabaseRecord } from "@domain/interfaces";

export interface IArtReviewHistory extends IDatabaseRecord {
    authored: Date;
    notes: string;
    rating: number;
    title: string;
}
