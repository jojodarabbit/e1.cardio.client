import { FC } from 'react';

import { Down, Growth } from '@/components/Icons';

import styles from './data-box.module.scss';

interface GrowthValueProps {
    isGrowth: boolean;
    value: number;
    text: string;
}

const GrowthValue: FC<GrowthValueProps> = (props) => {
    const { isGrowth, text, value } = props;

    return (
        <div className={styles.growth}>
            {isGrowth ? <Growth /> : <Down />}
            <span style={{ color: isGrowth ? '#00b69b' : '#f93c65' }}>{Math.abs(value)}%</span>
            <p>{text}</p>
        </div>
    );
};

export default GrowthValue;
