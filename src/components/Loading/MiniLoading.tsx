import Loader from './Loader';
import styles from './loading.module.scss';

const MiniLoading = () => {
    return (
        <div className={styles['mini-loading']}>
            <Loader />
        </div>
    );
};

export default MiniLoading;
