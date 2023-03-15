import { Role } from "../auth/models/role";

export interface NavbarNavigation {
    header: string,
    route: string,
    forRoles: Role[]
}