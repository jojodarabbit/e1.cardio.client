import { lazy } from 'react';

import {
    Customer,
    Dashboard as DashboardIcon,
    Logout as LogoutIcon,
    Orders as OrdersIcon,
    Package,
    Profile as ProfileIcon,
    Settings as SettingsIcon,
    Staff,
    Trainer
} from '@/components/Icons';
import { AppRouter, RouterGroup } from '@/constants/routes';
import DetailPackage from '@/pages/Packages/Detail';
import DetailPersonInfo from '@/pages/PersonInformation';
import CurrentLoginUserInfo from '@/pages/CurrentLoginUser';
import LoginUserInfo from '@/pages/LoginUserInfo';

const Login = lazy(() => import('@/pages/SignIn'));
const Packages = lazy(() => import('@/pages/Packages'));
const CreatePackage = lazy(() => import('@/pages/Packages/Create'));
const CustomerManagement = lazy(() => import('@/pages/CustomerManagement'));
const TrainerManagement = lazy(() => import('@/pages/TrainerManagement'));
const StaffManagement = lazy(() => import('@/pages/StaffManagement'));
const CustomerDetail = lazy(() => import('@/pages/Customer'));
const TrainerDetail = lazy(() => import('@/pages/Trainer'));
const StaffDetail = lazy(() => import('@/pages/Staff'));
const TrainingProgramDetail = lazy(() => import('@/pages/TrainingProgramDetail'));
const Profile = lazy(() => import('@/pages/Profile'));
const Settings = lazy(() => import('@/pages/Settings'));
const Logout = lazy(() => import('@/pages/Logout'));
const Orders = lazy(() => import('@/pages/Orders'));
const CreateSellPackage = lazy(() => import('@/pages/SellPackage/Create'));
const ViewSellPackage = lazy(() => import('@/pages/SellPackage/Detail'));
const EditSellPackage = lazy(() => import('@/pages/SellPackage/Edit'));
const Task = lazy(() => import('@/pages/Task'));
const TaskView = lazy(() => import('@/pages/Task/Detail'));
const TaskCreate = lazy(() => import('@/pages/Task/Create'));
const LessonPlan = lazy(() => import('@/pages/LessonPlan'));
const LessonPlanCreate = lazy(() => import('@/pages/LessonPlan/Create'));
const LessonPlanUpdate = lazy(() => import('@/pages/LessonPlan/Detail'));
import { getValue } from '@/utils/application';

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
let userRole;
if(token !== null){
    userRole = decodeJwt(token || "");
}

export const routes: AppRouter[] = [
    // { path: '/', element: <Home />, errorElement: <Error />, hidden: true, group: RouterGroup.management },
    { path: '/', element: <CustomerManagement />, hidden: true, group: RouterGroup.management },
    { path: '/sign-in', element: <Login />, hidden: true, group: RouterGroup.management },
    // {
    //     path: '/dashboard',
    //     element: <Dashboard />,
    //     label: 'Tổng quan',
    //     icon: <DashboardIcon />,
    //     group: RouterGroup.management,
    // },
    {
        path: '/packages',
        element: <Packages />,
        label: 'Gói tập',
        icon: <Package />,
        group: RouterGroup.management,
    },
    {
        path: '/package-create',
        element: <CreatePackage />,
        group: RouterGroup.management,
        hidden: true,
    },
    {
        path: '/package-detail',
        element: <DetailPackage />,
        group: RouterGroup.management,
        hidden: true,
    },
    {
        path: '/consultant-package/create',
        element: <CreateSellPackage />,
        group: RouterGroup.management,
        hidden: true,
    },
    {
        path: '/consultant-package/view',
        element: <ViewSellPackage />,
        group: RouterGroup.management,
        hidden: true,
    },
    {
        path: '/consultant-package/edit',
        element: <EditSellPackage />,
        group: RouterGroup.management,
        hidden: true,
    },
    {
        path: '/customer-management',
        element: <CustomerManagement />,
        label: 'Khách hàng',
        icon: <Customer />,
        group: RouterGroup.management,
    },
    {
        path: '/staff-management',
        element: <StaffManagement />,
        label: 'Nhân viên',
        icon: <Staff />,
        group: RouterGroup.management,
        hidden: token !== null && userRole !== null && userRole?.payload.roles === "Trainer"
    },
    {
        path: '/trainer-management',
        element: <TrainerManagement />,
        label: 'Huấn luyện viên',
        icon: <Trainer />,
        group: RouterGroup.management,
        hidden: token !== null && userRole !== null && userRole?.payload.roles === "Trainer"
    },
    {
        path: '/consultant-package',
        element: <Orders />,
        label: 'Tư vấn',
        icon: <OrdersIcon />,
        group: RouterGroup.management,
        hidden: token !== null && userRole !== null && userRole?.payload.roles === "Trainer"
    },
    {
        path: '/training-program',
        element: <TrainingProgramDetail />,
        group: RouterGroup.management,
        hidden: true,
    },
    { path: '/customer', element: <CustomerDetail />, hidden: true, group: RouterGroup.management },
    { path: '/trainer', element: <TrainerDetail />, hidden: true, group: RouterGroup.management },
    { path: '/staff', element: <StaffDetail />, hidden: true, group: RouterGroup.management },
    { path: '/persondetail/:id', element: <DetailPersonInfo />, hidden: true, group: RouterGroup.management },
    { path: '/lessonPlan', element: <LessonPlan />, label: 'Giáo Án', icon: <Package />, group: RouterGroup.management},
    { path: '/lessonplan/create', element: <LessonPlanCreate />, hidden: true, group: RouterGroup.management},
    { path: '/lessonplan/update/:id', element: <LessonPlanUpdate />, hidden: true, group: RouterGroup.management },
    { path: '/currentLoginUserInfo', element: <CurrentLoginUserInfo />, hidden: true, group: RouterGroup.management },
    { path: '/loginuserdetail', element: <LoginUserInfo />, hidden: true, group: RouterGroup.management },
    
    {
        path: '/profile',
        element: <Profile />,
        group: RouterGroup.management,
        icon: <ProfileIcon />,
        label: ' Profile',
        hidden: true,
    },
    {
        path: '/setting',
        element: <Settings />,
        group: RouterGroup.account,
        icon: <SettingsIcon />,
        label: 'Settings',
        hidden: true,
    },
    {
        path: '/tasks/',
        element: <Task />,
        label: 'Nhiệm vụ',
        group: RouterGroup.management,
        icon: <DashboardIcon />,
    },
    {
        path: '/tasks/view/:id',
        element: <TaskView />,
        group: RouterGroup.management,
        hidden: true,
    },
    {
        path: '/tasks/create',
        element: <TaskCreate />,
        group: RouterGroup.management,
        hidden: true,
    },
    { path: '/logout', element: <Logout />, group: RouterGroup.account, icon: <LogoutIcon />, label: 'Logout' },
];
