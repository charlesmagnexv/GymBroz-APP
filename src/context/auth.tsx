import React, { createContext, useContext, useEffect, useState } from "react";
import * as auth from "../services/auth";
import * as register from "../services/register";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../services/api";
import { LoginPost } from "../services/auth";
import { RegisterUserPost } from "../services/register";
import { User } from "../model/User";
import axios from "axios";


interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn({ email, password }: LoginPost): Promise<void>;
    signUp({ firstName, lastName, email, password}: RegisterUserPost): Promise<void>;
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

    async function signUp({ firstName, lastName, email, password }: RegisterUserPost) {
        const response = await register.signUp({ firstName, lastName, email, password });

    }

    async function confirmEmail( token: string ) {
        
    }

    // Poderia também ser assim: value={{signed: Boolean(user), user: {}, signIn}}
    return (
        <AuthContext.Provider value={{ signed: !!user || !(AsyncStorage.getItem('@GBAuth:token')), user, loading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };