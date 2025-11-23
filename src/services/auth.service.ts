import apiClient from '@/lib/api-client';
import { ApiResponse, User, LoginRequest, RegisterRequest, AuthResponse } from '@/types/api';
import Cookies from 'js-cookie';

export const authService = {
    // Login
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<ApiResponse<AuthResponse>>(
            '/auth/login',
            credentials
        );
        const { accessToken, refreshToken, user } = response.data.data!;

        // Store tokens in cookies
        Cookies.set('access_token', accessToken, { expires: 1 }); // 1 day
        Cookies.set('refresh_token', refreshToken, { expires: 7 }); // 7 days

        return { user, accessToken, refreshToken };
    },

    // Register
    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<ApiResponse<AuthResponse>>(
            '/auth/register',
            data
        );
        const { accessToken, refreshToken, user } = response.data.data!;

        // Store tokens in cookies
        Cookies.set('access_token', accessToken, { expires: 1 });
        Cookies.set('refresh_token', refreshToken, { expires: 7 });

        return { user, accessToken, refreshToken };
    },

    // Logout
    logout: async (): Promise<void> => {
        try {
            await apiClient.post('/auth/logout');
        } finally {
            // Clear tokens from cookies
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
        }
    },

    // Get current user
    getCurrentUser: async (): Promise<User> => {
        const response = await apiClient.get<ApiResponse<User>>('/auth/me');
        return response.data.data!;
    },

    // Refresh token
    refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
        const response = await apiClient.post<ApiResponse<{ accessToken: string }>>(
            '/auth/refresh',
            { refreshToken }
        );
        return response.data.data!;
    },
};

