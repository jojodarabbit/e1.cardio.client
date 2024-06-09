import Input from '@/components/Input';
import Status from '@/components/Status';
import { usersDetailInputs } from '@/constants/users';
import { useQuery } from '@/hooks';
import { UserManagementResponseDto } from '@/interfaces/Response/UserManagementResponseDto';
import { users } from '@/mocks/users';

import styles from './staff.module.scss';

const Staff = () => {
    const query = useQuery();
    const id = Number(query.get('id'));
    const user = users.find((user) => user.id === id);

    if (!user) {
        return <></>;
    }

    const getInputValue = (key: keyof UserManagementResponseDto): string | number => {
        return user[key];
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>{`${user.firstName} ${user.lastName}`}</h2>
                <Status type="success" text={user.status} className={styles.status} />
            </div>
            <div className={styles.content}>
                <div className={styles.inputs}>
                    {usersDetailInputs.map((input, index) => (
                        <Input key={index} label={input.label} disabled value={getInputValue(input.name)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Staff;
