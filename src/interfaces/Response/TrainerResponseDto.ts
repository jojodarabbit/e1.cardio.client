import { UserManagementResponseDto } from './UserManagementResponseDto';

export interface TrainerResponseDto extends UserManagementResponseDto {
    rating: number;
    certification: string;
}
