import LoginContainer from '@/components/Login';

import styles from './sign-in.module.scss';

const SignIn = () => {
    return (
        <div className={styles.container}>
            <LoginContainer />
        </div>
    );
};

export default SignIn;
