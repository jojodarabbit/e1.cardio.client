import { CustomerResponseDto } from '@/interfaces/Response/CustomerResponseDto';
import { UserDetailInputsLabel } from '@/interfaces/users';

export const customersDetailInputs: UserDetailInputsLabel<CustomerResponseDto>[] = [
    { label: 'First Name', name: 'firstName' },
    { label: 'Last Name', name: 'lastName' },
    { label: 'Email', name: 'email' },
    { label: 'Phone Number', name: 'phone' },
    { label: 'Date of Birth', name: 'dob' },
    { label: 'Address', name: 'address' },
    { label: 'Weight', name: 'weight' },
    { label: 'Height', name: 'height' },
];
