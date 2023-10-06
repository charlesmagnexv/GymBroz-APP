import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import * as auth from "../services/auth";

const api = axios.create({
  baseURL: 'https://gymbro-apy.onrender.com/api/v1',
});

export default api;


// Utiliza o refresh token para obter novo Token de acesso
async function checkAndRenewToken() {
  const acessToken = await AsyncStorage.getItem('@GBAuth:token');
  const refreshToken = await AsyncStorage.getItem('@GBAuth:refreshToken');

  if (!acessToken || !refreshToken) {
    return;
  }

  try {
    const response = await auth.renewToken(refreshToken)
    const { acessToken, newRefreshToken } = response.data;

    api.defaults.headers.Authorization = `Bearer ${acessToken}`;

    await AsyncStorage.setItem('@GBAuth:token', acessToken);
    await AsyncStorage.setItem('@GBAuth:refreshToken', newRefreshToken);
  } catch (error) {
    console.error('Erro ao renovar o token:', error);
    AsyncStorage.clear();
  }
}

// A cada requisição verifica se o token é inválido. Executa método de refresh do Token
api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response && (error.response.status === 401 || error.response.status === 400) && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        await checkAndRenewToken()
        return
      } catch (error) {
        console.error(error)
      }
    }
    return Promise.reject(error);
  }
);