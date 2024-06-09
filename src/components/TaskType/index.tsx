import clsx from 'clsx';
import { FC } from 'react';

import { ETaskType } from '@/constants/task';

import styles from './type.module.scss';

interface PackageTypeProps {
    type: ETaskType;
    text: string;
    className?: string;
}

const TaskType: FC<PackageTypeProps> = (props) => {
    const { text, type, className } = props;

    const getActiveClassName = (): string => {
        if (type === ETaskType.FINISH) {
            return styles.finish;
        }
        if (type === ETaskType.INPROCESS) {
            return styles.inprocess;
        }
        return styles.class;
    };

    return (
        <div className={styles.container}>
            <div className={clsx(styles.content, getActiveClassName(), className)}>{text}</div>
        </div>
    );
};

export default TaskType;
