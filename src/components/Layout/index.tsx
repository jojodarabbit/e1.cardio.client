import { FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { getValue } from '@/utils/application';

import Header from './Header';
import styles from './layout.module.scss';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: ReactNode | ReactNode[];
}

const Layout: FC<LayoutProps> = (props) => {
    const { children } = props;

    const token = getValue('token');
    if (!token) {
        window.location.pathname = '/sign-in';
        return <></>;
    }

    return (
        <div className={styles.container}>
            <Toaster />
            <Sidebar className={styles.sidebar} />
            <div className={styles['main-viewport']}>
                <Header className={styles.header} />
                <div className={styles.children}>{children}</div>
            </div>
        </div>
    );
};

export default Layout;
