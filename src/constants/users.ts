import { UserManagementResponseDto } from '@/interfaces/Response/UserManagementResponseDto';
import { UserDetailInputsLabel } from '@/interfaces/users';

export type UserAccountStatus = 'Active';

export const usersDetailInputs: UserDetailInputsLabel<UserManagementResponseDto>[] = [
    { label: 'First Name', name: 'firstName' },
    { label: 'Last Name', name: 'lastName' },
    { label: 'Email', name: 'email' },
    { label: 'Phone Number', name: 'phone' },
    { label: 'Date of Birth', name: 'dob' },
    { label: 'Address', name: 'address' },
];
