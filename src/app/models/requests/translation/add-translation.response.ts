import { RequestResponse } from "../request-response";

export interface AddTranslationResponse extends RequestResponse {
    insertedId: number,
}