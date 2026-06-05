import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAxios } from '../hooks/useAxios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { setAuthTokens, clearAuthTokens, isAuthenticated, get } = useAxios();

    useEffect(() => {
        // Check if user is logged in on mount
        const fetchUser = async () => {
            if (isAuthenticated()) {
                try {
                    const userData = await get('/auth/me');
                    setUser(userData);
                } catch (error) {
                    console.error('Failed to fetch user', error);
                    clearAuthTokens();
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const login = async (email, password) => {
        const response = await post('/auth/login', { email, password });
        const { accessToken, refreshToken, user: userData } = response;
        setAuthTokens(accessToken, refreshToken);
        setUser(userData);
        return userData;
    };

    const logout = () => {
        clearAuthTokens();
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: isAuthenticated(),
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);