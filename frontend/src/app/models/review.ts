import { Goal } from "./goal";

export interface Review {
    _id: string;
    goals: Goal[];
    timeSpan: string;
    finalRating: number;
    employee: {
        _id: string;
        name: string;
    }
}