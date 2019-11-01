import { UUID } from '../../types';
export declare class RoleDto {
    userId?: UUID;
    name?: string;
    description?: string;
}
export declare class CreateRoleDto extends RoleDto {
    userId: string;
    name: string;
    description?: string;
}
export declare class UpdateRoleDto extends RoleDto {
    userId?: string;
    name?: string;
    description?: string;
}
