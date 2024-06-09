import { UserProfileResponseDto } from '@/interfaces/Response/UserProfileResponseDto';
import { UserDetailInputsLabel } from '@/interfaces/users';

export const userProfileInputs: UserDetailInputsLabel<UserProfileResponseDto>[] = [
    { label: 'First Name', name: 'firstName' },
    { label: 'Last Name', name: 'lastName' },
    { label: 'Email', name: 'email' },
    { label: 'Phone Number', name: 'phone' },
    { label: 'Date of Birth', name: 'dob' },
    { label: 'Address', name: 'address' },
    { label: 'UserName', name: 'userName' },
    { label: 'Password', name: 'password' },
];
