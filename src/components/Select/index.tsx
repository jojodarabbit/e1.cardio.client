import clsx from 'clsx';
import { FC, useId } from 'react';

import styles from './select.module.scss';

export interface Option {
    label: string;
    value: string | number;
}

interface SelectProps {
    label?: string;
    className?: string;
    options: Option[];
    onChange?: (value: string | number) => void;
    defaultValue: number;
    value?: string | number;
    IsDisable?: boolean
}

const Select: FC<SelectProps> = (props) => {
    const { label, className, options, onChange, defaultValue, value, IsDisable } = props;

    const id = useId();
    return (
        <div className={clsx(styles.container, className)}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <select  id={id} onChange={(e) => onChange && onChange(e.target.value)} defaultValue={defaultValue} value={value} disabled={IsDisable}> 
                <option selected disabled></option>
                {options.map(({ label, value }, index) => (
                    <option key={index} value={value} >
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
