import { LabelProperties } from "../../label-properties";
import { RequestResponse } from "../request-response";

export interface AddLabelResponse extends RequestResponse {
    labels: LabelProperties[];
}