import axios from 'axios';
import { MiddlewareActionError } from '../types/shared/middleware-action-error';
import { MiddlewareActionErrorType } from '../types/shared/middleware-action-error-type';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5719',
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('Error was thrown while axios request performing', error);
    return Promise.reject(error);
  },
);

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
