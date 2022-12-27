import { AuthToken } from "./auth-token";

export interface User {
    username: string;
    password?: string;
    email?: string;
    accountType?: string;
    token?: AuthToken;
}