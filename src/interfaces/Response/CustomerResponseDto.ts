import { UserManagementResponseDto } from './UserManagementResponseDto';

export interface CustomerResponseDto extends UserManagementResponseDto {
    weight: string;
    height: string;
}
