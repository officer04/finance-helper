import axios from 'axios';
import { MiddlewareActionError } from '../types/middleware-action-error';
import { MiddlewareActionErrorType } from '../types/middleware-action-error-type';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5719',
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Запрос:', config);
    return config;
  },
  (error) => {
    console.error('Ошибка при выполнении запроса:', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('ответ', response);
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
