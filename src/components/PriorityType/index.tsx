import clsx from 'clsx';
import { FC } from 'react';

import { EPriorityType } from '@/constants/priority';

import styles from './type.module.scss';

interface PackageTypeProps {
    type: EPriorityType;
    text: string;
    className?: string;
}

const PriorityType: FC<PackageTypeProps> = (props) => {
    const { text, type, className } = props;

    const getActiveClassName = (): string => {
        if (type === EPriorityType.HIGH) {
            return styles.high;
        }
        if (type === EPriorityType.LOW) {
            return styles.low;
        }
        if (type === EPriorityType.MEDIUM) {
            return styles.medium;
        }
        return styles.class;
    };

    return (
        <div className={styles.container}>
            <div className={clsx(styles.content, getActiveClassName(), className)}>{text}</div>
        </div>
    );
};

export default PriorityType;
