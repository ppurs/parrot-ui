import { ResponseError } from './response-error';

export interface RequestResponse {
    result: boolean,
    errors?: ResponseError[]
}
