import axios, { InternalAxiosRequestConfig } from 'axios';
import { LOCAL_STORAGE_KEY } from '../constants/key';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//401 에러 refresh토큰 통한 토큰 갱신
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      //refresh 엔드포인트 401 에러가 발생한 경우 Unauthorized, 중복 재시도 방지를 위해 로그아웃 처리
      if (originalRequest.url === '/v1/auth/refresh') {
        // 직접 localStorage 사용
        localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
        window.location.href = '/login-page';
        return Promise.reject(error);
      }
      //재시도 플래그 설정
      originalRequest._retry = true;

      //이미 리프레시 요청이 진행중이면 promise 재 사용
      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            const refreshToken = localStorage.getItem(
              LOCAL_STORAGE_KEY.refreshToken
            );

            if (!refreshToken) {
              throw new Error('리프레시 토큰이 없습니다');
            }

            const { data } = await axiosInstance.post('/v1/auth/refresh', {
              refresh: refreshToken,
            });

            // 새 토큰 저장
            localStorage.setItem(
              LOCAL_STORAGE_KEY.accessToken,
              data.data.accessToken
            );
            localStorage.setItem(
              LOCAL_STORAGE_KEY.refreshToken,
              data.data.refreshToken
            );

            return data.data.accessToken;
          } catch (refreshError) {
            // 실패 시 토큰 제거
            localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
            localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
            // 로그인 페이지로 리디렉션
            window.location.href = '/login-page';
            throw refreshError;
          } finally {
            refreshPromise = null;
          }
        })();
      }

      // 진행중인 refreshPromise가 해결될 때까지 기다림
      try {
        const newAccessToken = await refreshPromise;
        if (newAccessToken) {
          axiosInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);
