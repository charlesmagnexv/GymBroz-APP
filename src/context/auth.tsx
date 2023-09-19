import React, { createContext, useContext, useEffect, useState } from "react";
import * as auth from "../services/auth";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../services/api";
import { LoginPost } from "../services/auth";
import { User } from "../model/User";
import axios from "axios";


interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn({ email, password }: LoginPost): Promise<void>;
    signOut(): void;
}

// {} é representado como um AuthContextData
// Outra solução seria: const AuthContext = createContext<AuthContextData | null>(null);
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider.');
    }

    return context;
}

const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    // Carrega o StorageData a cada requisição
    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await AsyncStorage.getItem('@GBAuth:user');
            const storagedToken = await AsyncStorage.getItem('@GBAuth:token');

            if (storagedUser && storagedToken) {
                setUser(JSON.parse(storagedUser));
                api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
            }

            setLoading(false);
        }

        loadStorageData();
    });


    // Recebe email e senha. Seta os tokens e passa accessToken como padrão nas requisições
    async function signIn({ email, password }: LoginPost) {
        const response = await auth.signIn({ email, password });
        setUser(response.data.user);

        api.defaults.headers.Authorization = `Baerer ${response.data.acessToken}`;

        await AsyncStorage.setItem('@GBAuth:user', JSON.stringify(response.data.user));
        await AsyncStorage.setItem('@GBAuth:token', response.data.acessToken);
        await AsyncStorage.setItem('@GBAuth:refreshToken', response.data.refreshToken)
    }

    // Limpa o AsyncStorage e seta o usuário
    async function signOut() {
        await AsyncStorage.clear();
        setUser(null);
    }

    // A cada requisição verifica se o token é inválido. Executa método de refresh do Token
    useEffect(() => {
        axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && error.response.status === 401) {
                    await checkAndRenewToken()
                    return
                }
                return Promise.reject(error)
            }
        )
    })

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
        }
    }

    // Poderia também ser assim: value={{signed: Boolean(user), user: {}, signIn}}
    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };