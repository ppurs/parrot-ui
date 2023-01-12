import { RequestResponse } from "../request-response";

export interface AddLabelResponse extends RequestResponse {
    insertedId: number;
}