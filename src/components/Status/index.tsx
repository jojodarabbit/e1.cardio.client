import clsx from 'clsx';
import { FC } from 'react';

import styles from './status.module.scss';

export type StatusType = 'success' | 'processing' | 'canceled';

interface StatusProps {
    type: StatusType;
    text: string;
    className?: string;
}

const Status: FC<StatusProps> = (props) => {
    const { text, type, className } = props;

    const getActiveClassName = (): string => {
        if (type === 'processing') {
            return styles.processing;
        }
        if (type === 'canceled') {
            return styles.canceled;
        }
        return styles.success;
    };

    return <div className={clsx(styles.container, getActiveClassName(), className)}>{text}</div>;
};

export default Status;
