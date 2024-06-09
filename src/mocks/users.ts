import { UserManagementResponseDto } from '@/interfaces/Response/UserManagementResponseDto';
import { UserProfileResponseDto } from '@/interfaces/Response/UserProfileResponseDto';

export const users: UserManagementResponseDto[] = [
    {
        id: 0,
        firstName: 'First',
        lastName: 'Last',
        phone: '0999 99 99 99',
        address: 'Ho Chi Minh City',
        dob: '19/09/1999',
        status: 'Active',
        email: 'example@gmail.com',
    },
    {
        id: 1,
        firstName: 'First',
        lastName: 'Last',
        phone: '0999 99 99 99',
        address: 'Ho Chi Minh City',
        dob: '19/09/1999',
        status: 'Active',
        email: 'example@gmail.com',
    },
    {
        id: 2,
        firstName: 'First',
        lastName: 'Last',
        phone: '0999 99 99 99',
        address: 'Ho Chi Minh City',
        dob: '19/09/1999',
        status: 'Active',
        email: 'example@gmail.com',
    },
    {
        id: 3,
        firstName: 'First',
        lastName: 'Last',
        phone: '0999 99 99 99',
        address: 'Ho Chi Minh City',
        dob: '19/09/1999',
        status: 'Active',
        email: 'example@gmail.com',
    },
    {
        id: 4,
        firstName: 'First',
        lastName: 'Last',
        phone: '0999 99 99 99',
        address: 'Ho Chi Minh City',
        dob: '19/09/1999',
        status: 'Active',
        email: 'example@gmail.com',
    },
    {
        id: 5,
        firstName: 'First',
        lastName: 'Last',
        phone: '0999 99 99 99',
        address: 'Ho Chi Minh City',
        dob: '19/09/1999',
        status: 'Active',
        email: 'example@gmail.com',
    },
];

export const userProfile: UserProfileResponseDto = {
    role: 'Admin',
    firstName: 'First Name',
    lastName: 'Last',
    email: 'example@gmail.com',
    phone: '0999 999 999',
    dob: 1711816055359,
    address: 'Ho Chi Minh city',
    userName: 'username@admin',
    password: 'password123',
    status: 'Active',
};