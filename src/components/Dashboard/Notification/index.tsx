import { Info, Ring } from '@/components/Icons';
import { timeRangeFormatter } from '@/utils/date-time';

import styles from './notification.module.scss';

const Notification = () => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Accouncements</h2>
                <div className={styles['notification-count']}>
                    <Ring />
                    <div className={styles.count}>
                        <span>5</span>
                    </div>
                </div>
            </div>
            <NotificationContent />
            <NotificationContent />
            <NotificationContent />
        </div>
    );
};

const NotificationContent = () => {
    return (
        <div className={styles['noti-content']}>
            <h3>Tran Khang</h3>
            <p>The workouts are fun, the fellow members...</p>
            <span>{timeRangeFormatter(1711461393)}</span>
            <div className={styles.icon}>
                <Info />
            </div>
        </div>
    );
};

export default Notification;
