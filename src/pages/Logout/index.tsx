import { useEffect } from 'react';

import { removeValue } from '@/utils/application';

const Logout = () => {
    useEffect(() => {
        removeValue('token');
        window.location.pathname = '/sign-in';
    }, []);
    return <></>;
};

export default Logout;
