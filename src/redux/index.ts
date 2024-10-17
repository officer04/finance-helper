import axios from 'axios';
import { MiddlewareActionError } from '../types/shared/middleware-action-error';
import { MiddlewareActionErrorType } from '../types/shared/middleware-action-error-type';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5719',
});

const authInterceptor = (config: any) => {
  config.headers['Accept-Language'] = localStorage.getItem('i18nextLng')
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('bearerToken')}`
  return config;
};

axiosInstance.interceptors.request.use(authInterceptor);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Error was thrown while axios request performing', error);

    const handledError: MiddlewareActionError = {
      type: MiddlewareActionErrorType.AxiosError,
      detail: error.response?.data?.detail,
      statusCode: error.response?.status,
    };

    return Promise.reject(handledError);
  },
);
