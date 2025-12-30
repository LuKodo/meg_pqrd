import { useAuthStore } from '@/features/auth/auth.store';
import ky, { type KyInstance } from 'ky';

const BASE_URL = import.meta.env.VITE_URI_API;
const TIMEOUT = 15000;

export class HttpClient {
    private static instance: KyInstance;
    private static token: string | null;

    public static getInstance(): KyInstance {
        HttpClient.token = localStorage.getItem('access_token');

        if (!HttpClient.instance) {
            HttpClient.instance = ky.create({
                prefixUrl: BASE_URL,
                timeout: TIMEOUT,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...(HttpClient.token && {
                        Authorization: `Bearer ${HttpClient.token}`,
                    }),
                },
                hooks: {
                    afterResponse: [
                        async (_request, _options, response) => {
                            if (response.status === 401) {
                                localStorage.removeItem('access_token');
                                localStorage.removeItem('data');
                                localStorage.removeItem('filter');
                                window.location.href = '/login';
                            }
                        },
                    ],
                },
            });
        }

        return HttpClient.instance;
    }
}

const httpClient = HttpClient.getInstance();

export { httpClient };

export const api = ky.create({
    prefixUrl: BASE_URL,
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
                }
                return response;
            },
        ],
    }
});
