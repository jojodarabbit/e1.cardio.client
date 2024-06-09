import clsx from 'clsx';
import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import LineBreak from '@/components/LineBreak';
import { RouterGroup } from '@/constants/routes';
import logo from '~/images/logo.png';

import { routes } from '../Router/Routes';
import styles from './sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

const Sidebar: FC<SidebarProps> = (props) => {
    const { className } = props;

    const { pathname } = useLocation();

    const groups = Object.keys(RouterGroup);
    const newRoutes = groups.map((group) => routes.filter((route) => route.group === group));

    return (
        <div className={clsx(styles.container, className)}>
            <Header />
            <div className={styles.groups}>
                {newRoutes.map((group, groupIndex) => (
                    <div key={groupIndex}>
                        {groupIndex > 0 && <LineBreak />}
                        {group
                            .filter((route) => !route.hidden)
                            .map((route, index) => {
                                const isActive = pathname === route.path;
                                return (
                                    <NavLink
                                        to={route.path ?? ''}
                                        key={index}
                                        className={clsx(styles.route, { [styles.active]: isActive })}
                                    >
                                        <div className={styles['route-content']}>
                                            {route.icon}
                                            <span>{route.label}</span>
                                        </div>
                                    </NavLink>
                                );
                            })}
                    </div>
                ))}
            </div>
        </div>
    );
};

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.content}>
                <img src={logo} alt="Logo" />
                <h3>E1 Cardio</h3>
            </div>
        </div>
    );
};

export default Sidebar;
