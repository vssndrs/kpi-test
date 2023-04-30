import { Review } from "./review";

export interface Employee {
    _id: string;
    name: string;
    supervisor: string;
    registrationNumber: number;
    jobTitle: string;
    reviews: Review[];
}