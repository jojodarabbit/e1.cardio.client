import clsx from 'clsx';
import { FC } from 'react';

import styles from './loading.module.scss';

interface LoaderProps {
    className?: string;
}

const Loader: FC<LoaderProps> = (props) => {
    const { className } = props;

    return <div className={clsx(styles.loader, className)}></div>;
};

export default Loader;
