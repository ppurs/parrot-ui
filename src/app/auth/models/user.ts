import { AccountState } from "src/app/models/account-state";
import { AuthToken } from "./auth-token";
import { Role } from "./role";

export interface User {
    userId?: number;
    username: string;
    password?: string;
    email?: string;
    accountState?: AccountState;
    token?: AuthToken;
    roles?: Role[];
}