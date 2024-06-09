import { TrainerResponseDto } from '@/interfaces/Response/TrainerResponseDto';
import { UserDetailInputsLabel } from '@/interfaces/users';

export const trainersDetailInputs: UserDetailInputsLabel<TrainerResponseDto>[] = [
    { label: 'First Name', name: 'firstName' },
    { label: 'Last Name', name: 'lastName' },
    { label: 'Email', name: 'email' },
    { label: 'Phone Number', name: 'phone' },
    { label: 'Date of Birth', name: 'dob' },
    { label: 'Address', name: 'address' },
    { label: 'Rating', name: 'rating' },
    { label: 'Certification', name: 'certification' },
];
