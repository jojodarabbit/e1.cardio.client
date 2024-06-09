import clsx from 'clsx';
import { FC } from 'react';

import styles from './data-box.module.scss';
import GrowthValue from './GrowValue';

interface DataBoxProps {
    className?: string;
    title: string;
    icon: string;
    data: string | number;
    growthText: string;
    growthValue: number;
    iconBgColor: string;
}

const DataBox: FC<DataBoxProps> = (props) => {
    const { className, title, icon, data, growthText, growthValue, iconBgColor } = props;

    const isGrowth = growthValue > 0;
    const newGrowthText = `${isGrowth ? 'Up' : 'Down'} ${growthText}`;

    return (
        <div className={clsx(className, styles.box)}>
            <div className={styles.data}>
                <div className={styles.value}>
                    <span>{title}</span>
                    <h3>{data}</h3>
                </div>
                <div className={styles.icon} style={{ backgroundColor: iconBgColor }}>
                    <img src={icon} alt="Icon" />
                </div>
            </div>
            <GrowthValue text={newGrowthText} value={growthValue} isGrowth={isGrowth} />
        </div>
    );
};

export default DataBox;
