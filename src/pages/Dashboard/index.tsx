import { useEffect } from 'react';

import Notification from '@/components/Dashboard/Notification';
import Report from '@/components/Dashboard/Report';
import TopSection from '@/components/Dashboard/TopSection';
import { useAppDispatch } from '@/hooks';
import { dashboardOverview } from '@/mocks/dashboard';
import { updateOverviewData } from '@/redux/slices/dashboard';

import styles from './dashboard.module.scss';

const Dashboard = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(updateOverviewData({ overview: dashboardOverview }));
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Dashboard</h2>
            <TopSection />
            <div className={styles['main-viewport']}>
                <Report />
                <Notification />
            </div>
        </div>
    );
};

export default Dashboard;
