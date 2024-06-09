import styles from './module.module.scss';

const Module = () => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Vận động căn bản</h3>
            <div className={styles['modified-history']}>
                <span>BW</span>
                <span className={styles.symbol}>|</span>
                <span>12 buổi</span>
                <span className={styles.symbol}>|</span>
                <span>Modified on 31/01/2024 By Tran Khang</span>
            </div>
        </div>
    );
};

export default Module;
