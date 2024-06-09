import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import Loader from '../Loading/Loader';
import styles from './button.module.scss';

interface ButtonProps {
    className?: string;
    content: string | ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    loading?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
    const { className, content, onClick, loading = false } = props;

    return (
        <button
            className={clsx(styles.button, className, { [styles.disabled]: loading })}
            onClick={onClick}
            disabled={loading}
        >
            {loading ? (
                <div className={styles.loading}>
                    <Loader className={styles.loader} />
                    <span>Loading...</span>
                </div>
            ) : (
                <>{content}</>
            )}
        </button>
    );
};

export default Button;
