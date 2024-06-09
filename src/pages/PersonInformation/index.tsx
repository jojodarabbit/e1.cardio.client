import clsx from 'clsx';
import { useAsync } from 'react-use';

import Button from '@/components/Button';
import { TrainingPrograms } from '@/components/Icons';
import Loader from '@/components/Loading/Loader';
import { BaseResponseDto } from '@/interfaces/Response/BaseResponseDto';
import { executeGetWithPagination } from '@/utils/http-client';

import styles from './personInfo.module.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PersonInformation } from '@/interfaces/Response/PersonInforDto';
import Input from '@/components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireFlameCurved, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const DetailPersonInfo = () => {

    const { id } = useParams();
    const location = useLocation();
    let dataFromMotherScreen = location.state;


    const { loading, value } = useAsync(async () => {
        try {
            const { data }: { data: BaseResponseDto<PersonInformation> } = await executeGetWithPagination(
                `/api/User/${id}`,
                { pageIndex: 1, pageSize: 1 },
            );
            return data.data;
        } catch (error) {
            console.error(error);
        }
    });

    const navigate = useNavigate();

    const handleCancelClick = () => {
        navigate(dataFromMotherScreen?.currentPage ? dataFromMotherScreen.currentPage : '/customer-management');
    };
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
                        <div className={styles['group-3']}>
                            <img
                                src={`https://pbs.twimg.com/media/F0u_EexaYAAyjp9.jpg`}
                                className={styles.avatar}
                            />
                            <div className={styles.username}>{value?.lastName} {value?.firstName}</div>
                            {value?.membershipTier === "Member" &&
                                <div className={styles.flex}>
                                    <div className={styles.membership}>
                                        <FontAwesomeIcon icon={faStarHalfAlt} />
                                        <div> {value?.membershipTier}</div>
                                    </div>
                                    <div className={styles.Platinum}>
                                        <FontAwesomeIcon icon={faFireFlameCurved} /><span></span>
                                        {value?.energyPoint}
                                    </div>
                                </div>
                            }
                            {value?.membershipTier === "PLatinum" &&
                                <div className={styles.flex}>
                                    <div className={styles.Platinum}>
                                        <FontAwesomeIcon icon={faStarHalfAlt} />
                                        <div> {value?.membershipTier}</div>
                                    </div>
                                    <div className={styles.Platinum}>
                                        <FontAwesomeIcon icon={faFireFlameCurved} /><span></span>
                                        <div> {value?.energyPoint}</div>
                                    </div>
                                </div>
                            }
                            {value?.membershipTier === "Gold" &&
                                <div className={styles.flex}>
                                    <div className={styles.Gold}>
                                        <FontAwesomeIcon icon={faStarHalfAlt} />
                                        <div> {value?.membershipTier}</div>
                                    </div>
                                    <div className={styles.Platinum}>
                                        <FontAwesomeIcon icon={faFireFlameCurved} /><span></span>
                                        <div> {value?.energyPoint}</div>
                                    </div>
                                </div>
                            }
                            {value?.membershipTier === "Silver" &&
                                <div className={styles.flex}>
                                    <div className={styles.Silver}>
                                        <FontAwesomeIcon icon={faStarHalfAlt} />
                                        <div> {value?.membershipTier}</div>
                                    </div>
                                    <div className={styles.Platinum}>
                                        <FontAwesomeIcon icon={faFireFlameCurved} /><span></span>
                                        <div> {value?.energyPoint}</div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={styles['group-1']}>
                            <Input
                                label="Email"
                                className={styles.input}
                                handleChange={() => { }}
                                value={value?.email}
                                disabled
                            />
                            <Input
                                label="Địa chỉ"
                                className={styles.input}
                                handleChange={() => { }}
                                value={value?.address}
                                disabled
                            />
                            {dataFromMotherScreen?.currentPage == "/staff-management" &&
                                <Input
                                    label="Vị trí"
                                    className={styles.input}
                                    handleChange={() => { }}
                                    value={value?.position}
                                    disabled
                                />
                            }
                            {dataFromMotherScreen?.currentPage == "/trainer-management" &&
                                <Input
                                    label="Chứng chỉ"
                                    className={styles.input}
                                    handleChange={() => { }}
                                    value={value?.certifications}
                                    disabled
                                />
                            }
                            {dataFromMotherScreen?.currentPage == "/customer-management" &&
                                <div>
                                    <Input
                                        label="Ngày sinh"
                                        className={styles.input}
                                        handleChange={() => { }}
                                        value={new Date(value?.dob as Date).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })}
                                        disabled />
                                    {value?.packages && value?.packages.length > 0 && <div className={styles.cardPackage}>
                                        <div className={styles.title}>
                                            Gói tập
                                        </div>
                                        <div className={styles.title}>
                                            {value?.packages.map((packageDisplay) => {
                                                return (
                                                    <div>{packageDisplay.packageName} : <a href={packageDisplay.packageUrl}>Download</a></div>

                                                );
                                            })
                                            }</div>
                                    </div>}
                                </div>
                            }
                        </div>
                        <div className={styles['group-2']}>
                            {dataFromMotherScreen?.currentPage == "/customer-management" && <div>
                                <div className={styles.flexbox}>
                                    <Input
                                        label="Cân nặng"
                                        className={styles.input}
                                        handleChange={() => { }}
                                        value={value?.weight + " kg"}
                                        disabled
                                    />
                                    <Input
                                        label="Chiều cao"
                                        className={styles.input}
                                        handleChange={() => { }}
                                        value={value?.height + " cm"}
                                        disabled
                                    />
                                </div>
                                <div className={styles.flexbox}>
                                    <Input
                                        label="Tỷ lệ cơ bắp"
                                        className={styles.input}
                                        handleChange={() => { }}
                                        value={value?.muscleRatio}
                                        disabled
                                    />
                                    <Input
                                        label="Tỷ lệ chất béo"
                                        className={styles.input}
                                        handleChange={() => { }}
                                        value={value?.fatRatio}
                                        disabled
                                    />
                                </div>
                                <Input
                                    label="Cấp độ mỡ nội tạng"
                                    className={styles.input}
                                    handleChange={() => { }}
                                    value={value?.visceralFatLevels}
                                    disabled
                                />
                            </div>}
                            {dataFromMotherScreen?.currentPage == "/customer-management" &&
                                (<div>
                                    <Input
                                        label="Số điện thoại"
                                        className={styles.input}
                                        handleChange={() => { }}
                                        value={value?.phone}
                                        disabled />
                                </div>)
                            }
                            {dataFromMotherScreen?.currentPage != "/customer-management" && <div>
                                <Input
                                    label="Số điện thoại"
                                    className={styles.input}
                                    handleChange={() => { }}
                                    value={value?.phone}
                                    disabled
                                />
                                <Input
                                    label="Ngày sinh"
                                    className={styles.input}
                                    handleChange={() => { }}
                                    value={new Date(value?.dob as Date).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })}
                                    disabled
                                />
                            </div>
                            }
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <div className={styles.group}>
                            <div />
                            <Button content={<span>Trở về</span>} className={clsx(styles.button, styles.cancel)} onClick={handleCancelClick} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailPersonInfo;

