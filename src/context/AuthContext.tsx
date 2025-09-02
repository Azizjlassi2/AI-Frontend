/* eslint-disable @typescript-eslint/no-non-null-assertion */
// src/context/AuthContext.tsx
import React, {
    createContext,
    useContext,
    useEffect,
    useReducer,
    ReactNode,
} from 'react';
import axios from '../api/axios';
import {
    AuthState,
    LoginData,
    LoginCredentials,
    ApiResponse,
    UserRole,
    DeveloperAccount,
    ClientAccount,
    AdminAccount,
} from '../types/auth';

type AuthAction =
    | { type: 'LOADING' }
    | { type: 'LOGIN'; payload: LoginData }
    | { type: 'REFRESH_ACCOUNT'; payload: LoginData }
    | { type: 'REFRESH_TOKENS'; payload: Pick<LoginData, 'token' | 'refresh_token' | 'expiresAt'> }
    | { type: 'LOGOUT' };

interface AuthContextType extends AuthState {
    login: (creds: LoginCredentials) => Promise<LoginData>;
    refreshTokens: () => Promise<void>;
    logout: () => Promise<void>;
    refreshAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// non‑null placeholder for account

const initialState: AuthState = {
    isAuthenticated: localStorage.getItem('isAuthenticated') ?? 'false',
    email: localStorage.getItem('email') ?? '',
    username: localStorage.getItem('username') ?? '',
    role: localStorage.getItem('role') as UserRole ?? '',
    token: localStorage.getItem('authToken') ?? null,
    tokenType: 'Bearer',
    refreshToken: localStorage.getItem('refreshToken') ?? null,
    expiresAt: localStorage.getItem('expiresAt') as UserRole ?? null,
    createdAt: localStorage.getItem('createdAt') as UserRole ?? null,
    updateAt: localStorage.getItem('updateAt') as UserRole ?? null,
    loading: true,

    account: (localStorage.getItem('role') as UserRole) === 'DEVELOPER'
        ? (JSON.parse(localStorage.getItem('account')!) as DeveloperAccount)
        : (localStorage.getItem('role') as UserRole) === 'ADMIN'
            ? (JSON.parse(localStorage.getItem('account')!) as AdminAccount)
            : (JSON.parse(localStorage.getItem('account')!) as ClientAccount),
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'LOADING':
            return { ...state, loading: true };

        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: 'true',
                token: action.payload.token,
                refreshToken: action.payload.refresh_token,
                expiresAt: action.payload.expiresAt,
                tokenType: action.payload.tokenType,
                email: action.payload.email,
                username: action.payload.username,
                role: action.payload.role,
                account: action.payload.account,
                createdAt: action.payload.createdAt,
                updateAt: action.payload.updateAt,
                loading: false,
            };

        case 'REFRESH_TOKENS':
            return {
                ...state,
                token: action.payload.token,
                refreshToken: action.payload.refresh_token,
                expiresAt: action.payload.expiresAt,
            };

        case 'LOGOUT':
            return { ...initialState, loading: false };

        default:
            return state;
    }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // on mount, try to rehydrate from localStorage
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('authToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const expiresAt = localStorage.getItem('expiresAt');
            const email = localStorage.getItem('email');
            const username = localStorage.getItem('username');
            const role = localStorage.getItem('role') as UserRole | null;
            const accountJson = localStorage.getItem('account');
            const createdAt = localStorage.getItem('createdAt');
            const updateAt = localStorage.getItem('updateAt');

            if (
                token &&
                refreshToken &&
                expiresAt &&
                email &&
                username &&
                role &&
                accountJson &&
                createdAt &&
                updateAt
            ) {
                const account =
                    role === 'DEVELOPER'
                        ? (JSON.parse(accountJson) as DeveloperAccount)
                        : role === 'ADMIN'
                            ? (JSON.parse(accountJson) as AdminAccount)
                            : (JSON.parse(accountJson) as ClientAccount);

                if (new Date(expiresAt) > new Date()) {
                    dispatch({
                        type: 'LOGIN',
                        payload: {
                            token,
                            refresh_token: refreshToken,
                            expiresAt,
                            tokenType: 'Bearer',
                            email,
                            username,
                            role,
                            account,
                            createdAt,
                            updateAt,
                        } as LoginData,
                    });
                } else {
                    try {
                        await refreshTokens();
                    } catch {
                        await logout();
                    }
                }
            } else {
                dispatch({ type: 'LOGOUT' });
            }
        })();
    }, []);

    // login → persist every field
    const login = async (creds: LoginCredentials): Promise<LoginData> => {
        dispatch({ type: 'LOADING' });
        const resp = await axios.post<ApiResponse<LoginData>>(
            '/api/v1/auth/login',
            creds
        );
        const data = resp.data.data;

        localStorage.setItem('authToken', data.token);
        localStorage.setItem('refreshToken', data.refresh_token);
        localStorage.setItem('expiresAt', data.expiresAt);
        localStorage.setItem('isAuthenticated', 'true');

        localStorage.setItem('email', data.email);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);
        localStorage.setItem('createdAt', data.createdAt);
        localStorage.setItem('updateAt', data.updateAt);

        // store typed account JSON
        if (data.role === 'DEVELOPER') {
            localStorage.setItem(
                'account',
                JSON.stringify(data.account as DeveloperAccount)
            );
        } else if (data.role === 'ADMIN') {
            localStorage.setItem(
                'account',
                JSON.stringify(data.account as AdminAccount)
            );
        } else {
            localStorage.setItem(
                'account',
                JSON.stringify(data.account as ClientAccount)
            );
        }

        dispatch({ type: 'LOGIN', payload: data });
        return data;
    };
    const refreshAccount = async () => {
        const account = localStorage.getItem('account');
        if (!account) throw new Error('No account found');
        const resp = await axios.get<ApiResponse<LoginData>>(
            '/api/v1/users/me',
        );
        const data = resp.data.data;

        localStorage.setItem('email', data.email);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);
        localStorage.setItem('createdAt', data.createdAt);
        localStorage.setItem('updateAt', data.updateAt);

        // store typed account JSON
        if (data.role === 'DEVELOPER') {
            localStorage.setItem(
                'account',
                JSON.stringify(data.account as DeveloperAccount)
            );
        } else if (data.role === 'ADMIN') {
            localStorage.setItem(
                'account',
                JSON.stringify(data.account as AdminAccount)
            );
        } else {
            localStorage.setItem(
                'account',
                JSON.stringify(data.account as ClientAccount)
            );
        } dispatch({ type: 'REFRESH_ACCOUNT', payload: data });
    }

    // silent refresh
    const refreshTokens = async () => {
        const rt = localStorage.getItem('refreshToken');
        if (!rt) throw new Error('No refresh token');
        const resp = await axios.post<ApiResponse<
            Pick<LoginData, 'token' | 'refresh_token' | 'expiresAt'>
        >>('/api/v1/auth/refresh-token', { refresh_token: rt });
        const { token, refresh_token, expiresAt } = resp.data.data;

        localStorage.setItem('authToken', token);
        localStorage.setItem('refreshToken', refresh_token);
        localStorage.setItem('expiresAt', expiresAt);

        dispatch({ type: 'REFRESH_TOKENS', payload: { token, refresh_token, expiresAt } });
    };

    // logout → clear all
    const logout = async () => {
        try {
            const t = localStorage.getItem('authToken');
            if (t) {
                await axios.post(
                    '/api/v1/auth/logout',
                    {},
                    { headers: { Authorization: `Bearer ${t}` } }
                );
            }
        } catch (e) {
            console.error('Logout error', e);
        } finally {
            localStorage.clear();
            location.reload()

            dispatch({ type: 'LOGOUT' });
        }
    };

    return (
        <AuthContext.Provider value={{ ...state, login, refreshTokens, logout, refreshAccount }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
