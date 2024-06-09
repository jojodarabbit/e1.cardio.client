import { ReactNode } from 'react';
import { NonIndexRouteObject } from 'react-router-dom';

export enum RouterGroup {
    management = 'management',
    account = 'account',
}

export interface AppRouter extends NonIndexRouteObject {
    label?: string;
    hidden?: boolean;
    icon?: ReactNode;
    activePath?: string;
    group: RouterGroup;
}
