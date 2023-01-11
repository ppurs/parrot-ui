import { LabelProperties } from "../../label-properties";
import { RequestResponse } from "../request-response";

export interface EditTranslationLabelResponse extends RequestResponse {
    labels: LabelProperties[]
}