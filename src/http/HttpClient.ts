import { useAuthStore } from '@/features/auth/auth.store';
import ky from 'ky';

const BASE_URL = import.meta.env.VITE_URI_API;
const TIMEOUT = 15000;

export const api = ky.create({
    prefixUrl: BASE_URL,
    timeout: TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    hooks: {
        beforeRequest: [
            (request) => {
                const token = useAuthStore.getState().token;
                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`);
                }
            }
        ],
        afterResponse: [
            async (_request, _options, response) => {
                if (response.status === 401) {
                    useAuthStore.getState().logout();
                    window.location.href = '/login';
                }
                return response;
            },
        ],
    }
});
