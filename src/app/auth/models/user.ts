import { AuthToken } from "./auth-token";
import { Role } from "./role";

export interface User {
    userId?: number;
    username: string;
    password?: string;
    email?: string;
    accountState?: number;
    token?: AuthToken;
    roles?: Role[];
}