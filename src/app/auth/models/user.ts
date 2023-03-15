import { AuthToken } from "./auth-token";
import { Role } from "./role";

export interface User {
    username: string;
    password?: string;
    email?: string;
    accountType?: string;
    token?: AuthToken;
    roles?: Role[];
}