import clsx from 'clsx';
import { FC } from 'react';

import { EPackageType } from '@/constants/packages';

import styles from './type.module.scss';

interface PackageTypeProps {
    type: EPackageType;
    text: string;
    className?: string;
}

const PackageType: FC<PackageTypeProps> = (props) => {
    const { text, type, className } = props;

    const getActiveClassName = (): string => {
        if (type === EPackageType.GOLD) {
            return styles.gold;
        }
        if (type === EPackageType.PLATIUM) {
            return styles.platium;
        }
        return styles.class;
    };

    return (
        <div className={styles.container}>
            <div className={clsx(styles.content, getActiveClassName(), className)}>{text}</div>
        </div>
    );
};

export default PackageType;
