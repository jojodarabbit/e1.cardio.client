import Input from '@/components/Input';
import Status from '@/components/Status';
import { trainersDetailInputs } from '@/constants/trainers';
import { useQuery } from '@/hooks';
import { TrainerResponseDto } from '@/interfaces/Response/TrainerResponseDto';
import { trainers } from '@/mocks/trainer';

import styles from './trainer.module.scss';

const Trainer = () => {
    const query = useQuery();
    const id = Number(query.get('id'));
    const trainer = trainers.find((trainer) => trainer.id === id);

    if (!trainer) {
        return <></>;
    }

    const getInputValue = (key: keyof TrainerResponseDto): string | number => {
        return trainer[key];
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>{`${trainer.firstName} ${trainer.lastName}`}</h2>
                <Status type="success" text={trainer.status} className={styles.status} />
            </div>
            <div className={styles.content}>
                <div className={styles.inputs}>
                    {trainersDetailInputs.map((input, index) => (
                        <Input key={index} label={input.label} disabled value={getInputValue(input.name)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Trainer;
