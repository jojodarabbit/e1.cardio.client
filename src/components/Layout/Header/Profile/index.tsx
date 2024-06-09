import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useToggle } from 'react-use';

// import { BaseResponseDto } from '@/interfaces/Response/BaseResponseDto';
// import { LoginResponseDto } from '@/interfaces/Response/LoginResponseDto';
import profile from '~/images/profile.png';

import Dropdown from '../Dropdown';
import styles from './profile.module.scss';
import { useNavigate } from 'react-router-dom';
import { getValue } from '@/utils/application';

const Profile = () => {
    const [isShowDropDown, toggleShowDropdown] = useToggle(false);

    // const { value } = useAsync(async () => API.get('/info'));
    // const { data: userInfo } = value?.data as BaseResponseDto<LoginResponseDto>;
    const navigate = useNavigate();
    const token = getValue('token');

    const base64UrlDecode = (input: string) => {
        // Replace characters not supported in base64url and convert to base64
        const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
        // Pad the base64 string with '=' until its length is a multiple of 4
        const padded = base64.padEnd((base64.length + 3) & ~3, '=');
        // Decode the base64 string
        return atob(padded);
    }

    const decodeJwt = (token: string) => {
        // Split the token into header, payload, and signature
        const [headerEncoded, payloadEncoded, signature] = token.split('.');
    
        // Decode header and payload
        const header = JSON.parse(base64UrlDecode(headerEncoded));
        const payload = JSON.parse(base64UrlDecode(payloadEncoded));
    
        return { header, payload, signature };
    }
    
    const userRole = decodeJwt(token || "");
    const handleClickInfo = () => {
        navigate("/loginuserdetail");
        toggleShowDropdown();
    };
    const handleClickLogout = () => {
        navigate("/logout");
        toggleShowDropdown();
    };
    return (
        <div className={styles.container}>
            <img src={profile} alt="Avatar" />
            <div className={styles.info}>
                <div className={styles.content}>
                    <span>{userRole.payload.phone}</span>
                    <span>{userRole.payload.roles} </span>
                </div>
            </div>
            <button className={styles.down} onClick={toggleShowDropdown}>
                {isShowDropDown && <FontAwesomeIcon icon={faAngleUp} />}
                {!isShowDropDown && <FontAwesomeIcon icon={faAngleDown} />}
            </button>
            <Dropdown isShow={isShowDropDown} clickInfo={handleClickInfo} clickLogout={handleClickLogout}/>
        </div>
    );
};

export default Profile;
