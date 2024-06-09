import { useAsync } from 'react-use';

import { TrainingPrograms } from '@/components/Icons';
import Loader from '@/components/Loading/Loader';
import { BaseResponseDto } from '@/interfaces/Response/BaseResponseDto';
import { executeGetWithPagination } from '@/utils/http-client';

import styles from './currentLoginUser.module.scss';
import { PersonInformation } from '@/interfaces/Response/PersonInforDto';
import Input from '@/components/Input';

const CurrentLoginUserInfo = () => {
    const { loading, value } = useAsync(async () => {
        try {
            const { data }: { data: BaseResponseDto<PersonInformation> } = await executeGetWithPagination(
                `/info`
            );
            return data.data;
        } catch (error) {
            console.error(error);
        }
    });
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <TrainingPrograms />
                <span>Thông tin người dùng</span>
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div className={styles.form}>
                    <div className={styles.inputs}>
                        <div className={styles['group-1']}>
                            <Input
                                label="Tên"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value?.firstName}
                                disabled
                            /> 
                            <Input
                                label="Họ"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value?.lastName}
                                disabled
                            /> 
                            <Input
                                label="Số điện thoại"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value?.phone}
                                disabled
                            /> 
                            <Input
                                label="Ngày sinh"
                                className={styles.input}
                                handleChange={() => {}}
                                value={new Date(value?.dob as Date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}
                                disabled
                            /> 
                        </div>
                        <div className={styles['group-2']}>
                            <Input
                                label="Email"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value?.email}
                                disabled
                            /> 
                            <Input
                                label="Địa chỉ"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value?.address}
                                disabled
                            /> 
                            <Input
                                label="Vị trí"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value?.position}
                                disabled
                            /> 
                        </div>
                    </div>
                    {/* <div className={styles.buttons}>
                        <div className={styles.group}>
                            <div/>
                            <Button content={<span>Trở về</span>} className={clsx(styles.button, styles.cancel)} onClick={handleCancelClick}/>
                        </div>
                    </div> */}
                </div>
            )}
        </div>
    );
};

export default CurrentLoginUserInfo;
