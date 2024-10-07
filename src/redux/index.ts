import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5719',
});

// Интерсептор запросов
axiosInstance.interceptors.request.use(
  (config) => {
    // Здесь можно добавить любые заголовки или настройки перед запросом
    console.log('Запрос:', config);
    return config; // Возвращаем конфигурацию запроса
  },
  (error) => {
    // Обработка ошибок запроса
    console.error('Ошибка при выполнении запроса:', error);
    return Promise.reject(error); // Возвращаем Promise с ошибкой
  }
);

// Интерсептор ответов
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("ответ", response)
    return response; // Возвращаем успешный ответ
  },
  (error) => {
    console.log(error)
    console.log("сервак лежит")
    // Обработка ошибок ответа
    console.error('Ошибка при выполнении ответа:', error.response ? error.response.data : error.message);
    return Promise.reject(error); // Возвращаем Promise с ошибкой

  }
);
