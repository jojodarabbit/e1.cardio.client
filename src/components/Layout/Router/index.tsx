import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Loading from '@/components/Loading';
import { PageWithoutLayout } from '@/routes/ExceptionRoutes';

import Layout from '..';
import { routes } from './Routes';

const AppRouter = () => {
    const pathname = window.location.pathname;
    const acceptedRoutes = routes.map((route) => route.path);

    const LayoutFragment =
        !acceptedRoutes.includes(pathname) || PageWithoutLayout.includes(pathname) ? React.Fragment : Layout;

    return (
        <Suspense fallback={<Loading />}>
            <BrowserRouter>
                <LayoutFragment>
                    <Routes>
                        {routes.map((route, index) => (
                            <Route key={index} path={route.path} element={route.element} />
                        ))}
                    </Routes>
                </LayoutFragment>
            </BrowserRouter>
        </Suspense>
    );
};

export default AppRouter;
