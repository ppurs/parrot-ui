import { AuthToken } from "src/app/auth/models/auth-token";
import { RequestResponse } from "./request-response";

export interface ImpersonateResponse extends RequestResponse {
    token: AuthToken
  }
  