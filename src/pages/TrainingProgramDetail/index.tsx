import LineBreak from '@/components/LineBreak';
import Module from '@/components/TrainingProgram/Module';

import styles from './training-program.module.scss';

const TrainingProgramDetail = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>Training Program</span>
                <h2>Phác đồ tập luyện E1 Cardio Workout</h2>
            </div>
            <div className={styles['top-section']}>
                <p className={styles['time']}>
                    <span className={styles.day}>31</span>days <span className={styles.duration}>(97 hours)</span>
                </p>
                <p className={styles['modified-history']}>
                    Modified on 23/7/2022 by <span>Warrior Tran</span>
                </p>
            </div>
            <LineBreak />
            <div className={styles['modules-container']}>
                <span className={styles.title}>Module</span>
                <div className={styles.modules}>
                    <Module />
                    <Module />
                    <Module />
                    <Module />
                    <Module />
                </div>
            </div>
        </div>
    );
};

export default TrainingProgramDetail;
