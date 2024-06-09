import clsx from 'clsx';
import { FC } from 'react';

import styles from './switch.module.scss';

interface SwitchButtonProps {
    className?: string;
    onChange?: (checked: boolean) => void;
    defaultChecked?: boolean;
}

const SwitchButton: FC<SwitchButtonProps> = (props) => {
    const { className, defaultChecked, onChange } = props;

    return (
        <div className={clsx(styles.container, className)}>
            <input
                type="checkbox"
                id="switch"
                onChange={(e) => onChange && onChange(e.target.checked)}
                defaultChecked={defaultChecked}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="switch"></label>
        </div>
    );
};

export default SwitchButton;
