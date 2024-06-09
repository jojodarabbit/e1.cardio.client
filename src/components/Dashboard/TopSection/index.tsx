import MiniLoading from '@/components/Loading/MiniLoading';
import { useAppSelector } from '@/hooks';
import { selectDashboardData } from '@/redux/slices/dashboard';
import { formatNumber } from '@/utils/common';

import DataBox from '../DataBox';
import styles from './top-section.module.scss';

const TopSection = () => {
    const { overview } = useAppSelector(selectDashboardData);

    if (!overview) {
        return <MiniLoading />;
    }

    const { member, trainer, staff, program } = overview;

    return (
        <div className={styles['top-section']}>
            <DataBox
                icon="/public/images/gym-member.png"
                title="Total Member"
                data={formatNumber(member.stat)}
                growthText="from yesterday"
                growthValue={member.growthNumber}
                iconBgColor="#e5e4ff"
            />
            <DataBox
                icon="/public/images/gymer.png"
                title="Total Trainer"
                data={trainer.stat}
                growthText="from past week"
                growthValue={trainer.growthNumber}
                iconBgColor="#fff3d6"
            />
            <DataBox
                icon="/public/images/90f0f.png"
                title="Staffs"
                data={formatNumber(staff.stat)}
                growthText="from yesterday"
                growthValue={staff.growthNumber}
                iconBgColor="#d9f7e8"
            />
            <DataBox
                icon="/public/images/cbe4ce9.png"
                title="Training Programs"
                data={program.stat}
                growthText="from yesterday"
                growthValue={program.growthNumber}
                iconBgColor="#ffded1"
            />
        </div>
    );
};

export default TopSection;
