import Button from '@/components/Button';
import Input from '@/components/Input';
import SwitchButton from '@/components/SwitchButton';
import UploadFile from '@/components/UploadFile';
import { userProfileInputs } from '@/constants/profile';
import { UserProfileResponseDto } from '@/interfaces/Response/UserProfileResponseDto';
import { userProfile } from '@/mocks/users';
import { dateConverter } from '@/utils/date-time';

import styles from './profile.module.scss';

const Profile = () => {
    const user = userProfile;

    if (!user) {
        return <></>;
    }

    const getInputValue = (key: keyof UserProfileResponseDto): string | number => {
        return user[key];
    };

    const handleChange = (checked: boolean) => {
        console.log(checked);
    };

    const handleUpdateClick = () => {
        console.log('Update clicked');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>My profile</h2>
            </div>
            <div className={styles.content}>
                <div className={styles.inputs}>
                    {userProfileInputs.map((input, index) => {
                        if (input.name === 'password') {
                            return (
                                <Input
                                    key={index}
                                    label={input.label}
                                    disabled
                                    value={getInputValue(input.name)}
                                    type="password"
                                />
                            );
                        }
                        if (input.name === 'dob') {
                            const date = dateConverter(Number(getInputValue(input.name)));
                            return <Input key={index} label={input.label} defaultValue={date} type="date" />;
                        }
                        return <Input key={index} label={input.label} disabled value={getInputValue(input.name)} />;
                    })}
                </div>
                <div className={styles.upload}>
                    <div className={styles.status}>
                        <span>Status</span>
                        <div className={styles['btn-wrapper']}>
                            <SwitchButton onChange={handleChange} defaultChecked className={styles.btn} />
                        </div>
                    </div>
                    <UploadFile content="Upload your certificate" className={styles['upload-btn']} />
                </div>
                <div className={styles['update-btn']}>
                    <Button content="Update" className={styles.button} onClick={handleUpdateClick} />
                </div>
            </div>
        </div>
    );
};

export default Profile;
