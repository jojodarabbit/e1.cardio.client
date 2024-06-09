import { motion } from 'framer-motion';
import { FC } from 'react';

import styles from './drop-down.module.scss';

interface DropdownProps {
    isShow: boolean;
    clickInfo: () => void;
    clickLogout: () => void;
}

const variants = {
    open: { opacity: 1, height: '88px' },
    closed: { opacity: 0, height: 0 },
};

const Dropdown: FC<DropdownProps> = ({ isShow, clickInfo, clickLogout }) => {
    return (
        <motion.div className={styles.container} animate={isShow ? 'open' : 'closed'} variants={variants}>
            <span onClick={clickInfo} className='selection'>Thông tin</span>
            <span onClick={clickLogout} className='selection'>Đăng xuất</span>
        </motion.div>
    );
};

export default Dropdown;