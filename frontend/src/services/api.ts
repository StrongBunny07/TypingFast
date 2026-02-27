import axios from 'axios';
import type {
    AuthResponse,
    LoginRequest,
    SignupRequest,
    TypingText,
    TypingSubmitRequest,
    TypingResult,
    UserProfile,
    UserStats,
    PaginatedHistory,
    TypingHistory,
} from '../types';

// API Base URL (configure via .env files)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ============================================
// Auth API
// ============================================

export const authApi = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', data);
        return response.data;
    },

    signup: async (data: SignupRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/signup', data);
        return response.data;
    },
};

// ============================================
// Typing API
// ============================================

export const typingApi = {
    getText: async (words: number = 50): Promise<TypingText> => {
        const response = await api.get<TypingText>('/typing/text', {
            params: { words },
        });
        return response.data;
    },

    submitResult: async (data: TypingSubmitRequest): Promise<TypingResult> => {
        const response = await api.post<TypingResult>('/typing/submit', data);
        return response.data;
    },
};

// ============================================
// Dashboard API
// ============================================

export const dashboardApi = {
    getProfile: async (): Promise<UserProfile> => {
        const response = await api.get<UserProfile>('/dashboard/profile');
        return response.data;
    },

    getStats: async (): Promise<UserStats> => {
        const response = await api.get<UserStats>('/dashboard/stats');
        return response.data;
    },

    getHistory: async (page: number = 0, size: number = 10): Promise<PaginatedHistory> => {
        const response = await api.get<PaginatedHistory>('/dashboard/history', {
            params: { page, size },
        });
        return response.data;
    },

    getAllHistory: async (): Promise<TypingHistory[]> => {
        const response = await api.get<TypingHistory[]>('/dashboard/history/all');
        return response.data;
    },
};

export default api;
