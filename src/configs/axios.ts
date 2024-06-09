import axios, { AxiosError, AxiosHeaders } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-hot-toast';

import { getValue, removeValue } from '@/utils/application';

export const API = axios.create({
    baseURL: import.meta.env.VITE_APP_API_ENDPOINT as string,
});

API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (!error.response) {
            return Promise.reject(error);
        }
        if ((error as AxiosError).response?.status === StatusCodes.FORBIDDEN) {
            toast.error('Please logout and try again!');
            removeValue('token');
            if (window.location.pathname != '/login') {
                window.location.pathname = '/login';
            }
        }
        if (error.response?.status === 404 || error.response?.status >= 500) {
            const errorMessage = error.response?.data?.message;
            toast.error(errorMessage);
            return Promise.reject(error);
        }
        if (error.response?.status >= 400 && error.response?.status < 500) {
            const errorResponse = error.response?.data;
            return Promise.reject(errorResponse);
        }
        return Promise.reject((error as AxiosError).response?.data);
    },
);

API.interceptors.request.use(
    (config) => {
        const token = getValue('token');
        config.headers.Authorization = `Bearer ${token}`;
        config.headers = {
            mode: 'cors',
            ...config.headers,
        } as unknown as AxiosHeaders;

        return config;
    },
    (error) => {
        console.warn(error);
    },
);
