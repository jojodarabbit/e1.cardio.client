import { faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

import styles from './table-action.module.scss';

interface TableActionProps {
    onViewClick: () => void;
    onDeleteClick: () => void;
}

const TableActionForView: FC<TableActionProps> = ({ onViewClick, onDeleteClick }) => {
    return (
        <div className={styles.container}>
            <FontAwesomeIcon icon={faEye} className={styles.edit} onClick={onViewClick} />
            <span>|</span>
            <FontAwesomeIcon icon={faTrashCan} className={styles.delete} onClick={onDeleteClick} />
        </div>
    );
};

export default TableActionForView;