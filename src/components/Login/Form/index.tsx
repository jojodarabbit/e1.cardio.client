import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { LoginFormValidateMessage } from '@/interfaces/LoginFormValidate';
import { LoginRequestDto } from '@/interfaces/Request/LoginRequestDto';

import styles from './form.module.scss';

interface LoginFormProps {
    handleLogin: (request: LoginRequestDto) => void;
    loading: boolean;
}

const defaultRequest = { phone: '', password: '' };

const LoginForm: FC<LoginFormProps> = (props) => {
    const { handleLogin, loading } = props;

    const [data, setData] = useState<LoginRequestDto>(defaultRequest);
    const [errors, setErrors] = useState<Record<keyof LoginRequestDto, LoginFormValidateMessage | null>>({
        phone: null,
        password: null,
    });

    const { handleSubmit } = useForm<LoginRequestDto>();

    const handleError = (fields: (keyof LoginRequestDto)[]) => {
        fields.forEach((field) => {
            const errorMessage = field === 'phone' ? 'Username' : 'Password';
            setErrors((prev) => ({ ...prev, [field]: { type: 'required', message: `${errorMessage} is required!` } }));
        });
    };

    const onSubmit = () => {
        if (data.phone.isEmpty() && data.password.isEmpty()) {
            handleError(['phone', 'password']);
        }
        if (data.phone.isEmpty()) {
            handleError(['phone']);
            return;
        }
        if (data.password.isEmpty()) {
            handleError(['password']);
            return;
        }
        handleLogin(data);
    };

    const handleInputChange = (name: keyof LoginRequestDto, value: string) => {
        setErrors((prev) => ({ ...prev, [name]: null }));
        setData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputs}>
                <Input
                    className={styles.input}
                    label="Số điện thoại"
                    placeholder="Số điện thoại"
                    handleChange={(_, value) => handleInputChange('phone', String(value))}
                    error={errors?.phone}
                />
                <Input
                    className={styles.input}
                    type="password"
                    label="Mật khẩu"
                    placeholder="Mật khẩu"
                    handleChange={(_, value) => handleInputChange('password', String(value))}
                    error={errors?.password}
                />
            </div>
            <div className={styles.submit}>
                <Button content="Đăng nhập" className={styles.button} type="submit" loading={loading} />
            </div>
        </form>
    );
};

export default LoginForm;