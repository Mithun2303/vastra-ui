import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAxios } from '../hooks/useAxios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { login: setAuthToken, logout: clearAuthToken, isAuthenticated, get, post } = useAxios();

    useEffect(() => {
        // Check if user is logged in on mount
        const fetchUser = async () => {
            if (isAuthenticated()) {
                try {
                    const userData = await get('/auth/me');
                    setUser(userData);
                } catch (error) {
                    console.error('Failed to fetch user', error);
                    clearAuthToken();
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, [isAuthenticated, get, clearAuthToken]);

    const login = async (identifier, password) => {
        const response = await post('/auth/login', { identifier, password });
        const { token, user_id, onboarding_complete } = response;
        setAuthToken(token);
        
        // Fetch full profile details or set basic user context
        const userData = { user_id, onboarding_complete };
        setUser(userData);
        return response;
    };

    const logout = () => {
        clearAuthToken();
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