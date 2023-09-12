import React, { createContext, useContext, useEffect, useState } from "react";
import * as auth from "../services/auth";
import AsyncStorage from "@react-native-community/async-storage";
import { ActivityIndicator, View } from "react-native";
import api from "../services/api";
import { LoginPost } from "../services/auth";
import { User } from "../model/User";


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

    async function signIn({ email, password }: LoginPost) {
        const response = await auth.signIn({ email, password });
        setUser(response.data.user);

        api.defaults.headers.Authorization = `Baerer ${response.data.acessToken}`;

        await AsyncStorage.setItem('@GBAuth:user', JSON.stringify(response.data.user));
        await AsyncStorage.setItem('@GBAuth:token', response.data.acessToken);
    }

    async function signOut() {
        await AsyncStorage.clear();
        setUser(null);
    }

    // Poderia ser assim também: value={{signed: Boolean(user), user: {}, signIn}}
    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };