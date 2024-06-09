import clsx from 'clsx';
import { FC, ReactNode, useId } from 'react';

import styles from './upload.module.scss';

interface UploadFileProps {
    className?: string;
    content?: string | ReactNode | ReactNode[];
}

const UploadFile: FC<UploadFileProps> = (props) => {
    const { className, content = 'File upload' } = props;
    const id = useId();

    return (
        <div className={clsx(styles.container, className)}>
            <input id={id} type="file" />
            <label htmlFor={id}>{content}</label>
        </div>
    );
};

export default UploadFile;
