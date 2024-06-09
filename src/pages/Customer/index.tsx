import Input from '@/components/Input';
import Status from '@/components/Status';
import { customersDetailInputs } from '@/constants/customers';
import { useQuery } from '@/hooks';
import { CustomerResponseDto } from '@/interfaces/Response/CustomerResponseDto';
import { customers } from '@/mocks/customers';

import styles from './customer.module.scss';

const Customer = () => {
    const query = useQuery();
    const id = Number(query.get('id'));
    const customer = customers.find((customer) => customer.id === id);

    if (!customer) {
        return <></>;
    }

    const getInputValue = (key: keyof CustomerResponseDto): string | number => {
        return customer[key];
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>{`${customer.firstName} ${customer.lastName}`}</h2>
                <Status type="success" text={customer.status} className={styles.status} />
            </div>
            <div className={styles.content}>
                <div className={styles.inputs}>
                    {customersDetailInputs.map((input, index) => (
                        <Input key={index} label={input.label} disabled value={getInputValue(input.name)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Customer;
