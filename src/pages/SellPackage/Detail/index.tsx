import clsx from 'clsx';

import Button from '@/components/Button';
import Input from '@/components/Input';

import styles from './detail.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { executeGetWithPagination  } from '@/utils/http-client';
import { BaseResponseDto } from '@/interfaces/Response/BaseResponseDto';
import { useAsync } from 'react-use';
import { SelledPackageResponseDto } from '@/interfaces/Response/SelledPackageResponseDto';
import { formatNumber } from '@/utils/common';


enum DaysOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
const EditSellPackage = () => {


    const location = useLocation();
    
    let id = location.state.id;
    const { value } = useAsync(async () => {
        try {
            const { data }: { data: BaseResponseDto<SelledPackageResponseDto> } = await executeGetWithPagination(
                `/api/PackageConsultant/${id}`,
                { pageIndex: 1, pageSize: 1000000 },
            );
            console.log(value);
            return data.data;
        } catch (error) {
            console.error(error);
        }
    });

    const navigate = useNavigate();

    const handleCancelClick = () => {
        navigate('/consultant-package');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>Đơn hàng</span>
            </div>
            {value && <div className={styles.form}>
            {/* Khach Hang */}
            <div>
            <div className={styles.cardsmall}>
                <div className={styles.title}>
                    <span>Khách hàng</span>
                </div>
                <div className={styles.inputs}>
                    <div className={styles['group-1']}>
                        <div className={styles.tools}>
                            {/* <div className={styles.tools}> Khách hàng </div> */}
                        </div>
                        <div className={styles.card__content}>
                            <Input
                                label="Họ và tên"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value.consultees.lastName + " " + value.consultees.firstName}
                                disabled
                            />
                            <Input
                                label="Số điện thoại"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value.consultees.phone}
                                disabled
                            />
                        </div>
                    </div>
                    <div className={styles['group-1']}>
                        <div className={styles.tools}>
                        </div>
                        <div className={styles.card__content}>
                            <Input
                                label="Email"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value.consultees.email}
                                disabled
                            />
                        </div>
                    </div>
                 </div>
                </div>
            </div>
            {/* Nhân viên */}
            <div>
            <div className={styles.cardsmall}>
                <div className={styles.title}>
                    <span>Nhân viên</span>
                </div>
                <div className={styles.inputs}>
                    <div className={styles['group-1']}>
                        <div className={styles.tools}>
                            {/* <div className={styles.tools}> Khách hàng </div> */}
                        </div>
                        <div className={styles.card__content}>
                            <Input
                                label="Họ và tên"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value.consultants.lastName + " " + value.consultants.firstName}
                                disabled
                            />
                            <Input
                                label="Số điện thoại"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value.consultants.phone}
                                disabled
                            />
                        </div>
                    </div>
                    <div className={styles['group-1']}>
                        <div className={styles.tools}>
                        </div>
                        <div className={styles.card__content}>
                            <Input
                                label="Email"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value.consultants.email}
                                disabled
                            />
                        </div>
                    </div>    
                 </div>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.group}>
                    <div />
                    </div>
                </div>
            </div>
            {/* Gói tập */}
            <div>
            <div className={styles.card}>
                <div className={styles.title}>
                    <span>Gói tập</span>
                </div>
                <div className={styles.inputs}>
                    <div className={styles['group-1']}>
                        <div className={styles.tools}>
                            {/* <div className={styles.tools}> Khách hàng </div> */}
                        </div>
                        <div className={styles.card__content}>
                            <Input
                                label="Tên gói tập"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value.demoPackage.packageName}
                                disabled
                            />
                            <Input
                                label="Mô tả"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value.demoPackage.descriptions}
                                disabled
                            />
                            <div className={styles.flexbox}>
                                <Input
                                    label="Số ngày"
                                    className={styles.input}
                                    handleChange={() => {}}
                                    value={value.demoPackage.numberOfDays}
                                    disabled
                                />
                                <Input
                                    label="Số buổi"
                                    className={styles.input}
                                    handleChange={() => {}}
                                    value={value.demoPackage.numberOfSessions}
                                    disabled
                                />
                                <Input
                                    label="Loại"
                                    className={styles.input}
                                    handleChange={() => {}}
                                    value={value.demoPackage.type}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles['group-1']}>
                        <div className={styles.tools}>
                            {/* <div className={styles.tools}> Khách hàng </div> */}
                        </div>
                        <div className={styles.card__content}>
                            <div className={styles.flexbox}>
                                <Input
                                    label="Giá tiền"
                                    className={styles.input}
                                    handleChange={() => {}}
                                    value={formatNumber(value.demoPackage.packagePrice as number)}
                                    disabled
                                />
                                <Input
                                    label="Số điện thoại"
                                    className={styles.input}
                                    handleChange={() => {}}
                                    value={value.demoPackage.branch.phone}
                                    disabled
                                />
                            </div>
                            <Input
                                label="Tên chi nhánh"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value.demoPackage.branch.branchName}
                                disabled
                            />
                            <Input
                                label="Vị trí chi nhánh"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value.demoPackage.branch.location}
                                disabled
                            />
                        </div>
                    </div>
                 </div>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.group}>
                    <div />
                    </div>
                </div>
            </div>
            {/* Thông tin khác*/}
            <div>
            <div className={styles.card}>
                <div className={styles.title}>
                    <span>Thông tin khác</span>
                </div>
                <div className={styles.inputs}>
                    <div className={styles['group-1']}>
                        <div className={styles.tools}>
                            {/* <div className={styles.tools}> Khách hàng </div> */}
                        </div>
                        <div className={styles.card__content}>
                            <Input
                                label="Ngày bắt đầu"
                                className={styles.input}
                                handleChange={() => {}}
                                value={new Date(value.startDate as Date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}
                                disabled
                            />
                            <Input
                                label="Ngày kết thúc"
                                className={styles.input}
                                handleChange={() => {}}
                                value={new Date(value.endDate as Date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}
                                disabled
                            />
                            {/* <div className={styles.flexbox}>
                                <Input
                                    label="Trainer dạy"
                                    className={styles.input}
                                    handleChange={() => {}}
                                    value={value.trainPackageTrainer}
                                    disabled
                                />
                                <Input
                                    label="Trainer tạo đơn hàng"
                                    className={styles.input}
                                    handleChange={() => {}}
                                    value={value.createPackageTrainer}
                                    disabled
                                />
                            </div> */}
                        </div>
                    </div>
                    <div className={styles['group-1']}>
                        <div className={styles.tools}>
                            {/* <div className={styles.tools}> Khách hàng </div> */}
                        </div>
                        <div className={styles.card__content}>
                            <div className={styles.label}>Lịch tập</div>
                            <div className={styles.cardSchedule}> 
                            {value.schedules.map((schedule, index) => (
                                <div key={index} className={styles.schedule}>
                                    {DaysOfWeek[schedule.day]} - {schedule.time.hour}:{schedule.time.minute}
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                 </div>
                </div>
                <div className={styles.buttons}>
                        <div className={styles.group}>
                            <div/>
                            <Button content={<span>Trở về</span>} className={clsx(styles.button, styles.cancel)} onClick={handleCancelClick}/>
                        </div>
                    </div>
            </div>
            </div>}
        </div>
    );
};

export default EditSellPackage;