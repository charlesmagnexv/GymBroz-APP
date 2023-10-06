import axios, { AxiosResponse } from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import * as auth from "../services/auth";
import { RenewTokenDTO } from '../model/Auth';

const api = axios.create({
  baseURL: 'https://gymbro-apy.onrender.com/api/v1',
});

export default api;

// Utiliza o refresh token para obter novo Token de acesso
export const renewToken = async (refresh_token: string): Promise<AxiosResponse<RenewTokenDTO>> => {
  const response = await api.post(`/auth/refresh_token`, {
    refreshToken: refresh_token
  })
  return response
}

// A cada requisição verifica se o token é inválido. Executa método de refresh do Token
api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const refreshToken = await AsyncStorage.getItem('@GBAuth:refreshToken') || '';
    const originalConfig = error.config;

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 400) &&
      !originalConfig._retry &&
      originalConfig.url !== "/auth/login"
    ) {
      originalConfig._retry = true;

      try {
        const response = await renewToken(refreshToken)
        const { acessToken, newRefreshToken } = response.data;

        api.defaults.headers.Authorization = `Bearer ${acessToken}`;

        await AsyncStorage.setItem('@GBAuth:token', acessToken);
        await AsyncStorage.setItem('@GBAuth:refreshToken', newRefreshToken);

        return api(originalConfig)
      } catch (error) {
        console.error('Erro ao renovar o token:', error);
        AsyncStorage.clear();
      }

    }
    return Promise.reject(error);
  }
);