import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLProps, useId } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './textarea.module.scss';

interface ITextareaProps extends HTMLProps<HTMLTextAreaElement> {
    label?: string;
    className?: string;
    error?: FieldError;
    required?: boolean;
    handleChange?: (name: string, value: unknown) => void;
}

const Textarea = (props: ITextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const { className, label, required, error, name, handleChange } = props;

    const id = useId();

    const hasError = () => {
        return error && error.message && error.message.length > 0;
    };

    return (
        <div className={clsx(styles.container, className)}>
            <label htmlFor={id} className={styles.label}>
                {label}
                {required && <span className={styles.required}>*</span>}
            </label>
            <textarea
                ref={ref}
                {...props}
                id={id}
                className={clsx(styles.textarea, {
                    [styles.required]: error?.type === 'required',
                    [styles.disabled]: props.disabled,
                })}
                onChange={(e) =>
                    handleChange && (name ? handleChange(name, e.target.value) : handleChange('', e.target.value))
                }
            />
            {hasError() && <span className={styles.error}>{error?.message}</span>}
        </div>
    );
};

export default forwardRef(Textarea);
