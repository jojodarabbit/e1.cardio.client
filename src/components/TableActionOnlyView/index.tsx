import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

import styles from './table-action.module.scss';

interface TableActionProps {
    onViewClick: () => void;
}

const TableActionOnlyView: FC<TableActionProps> = ({ onViewClick }) => {
    return (
        <div className={styles.container}>
            <FontAwesomeIcon icon={faEye} className={styles.edit} onClick={onViewClick} />
        </div>
    );
};

export default TableActionOnlyView;