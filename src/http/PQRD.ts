import ky, { type KyInstance } from 'ky';

const BASE_URL = import.meta.env.VITE_API_PQRS;
const TIMEOUT = 15000;

export class HttpClient {
    private static instance: KyInstance;

    public static getInstance(): KyInstance {
        if (!HttpClient.instance) {
            HttpClient.instance = ky.create({
                prefixUrl: BASE_URL,
                timeout: TIMEOUT,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
        }

        return HttpClient.instance;
    }
}

const httpPQRD = HttpClient.getInstance();

export { httpPQRD };
