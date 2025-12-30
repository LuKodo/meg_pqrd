import { HTTPError, TimeoutError } from 'ky';
import { toast } from 'sonner';

export class HttpErrorHandler {
    static async handle(error: unknown): Promise<void> {
        if (error instanceof HTTPError) {
            const status = error.response.status;
            const data = await this.parseResponse(error);

            switch (status) {
                case 400:
                    this.handleBadRequest(data);
                    break;
                case 401:
                    this.handleUnauthorized();
                    break;
                case 403:
                    this.handleForbidden();
                    break;
                case 404:
                    this.handleNotFound(data);
                    break;
                case 422:
                    this.handleValidationError(data);
                    break;
                case 500:
                    this.handleServerError();
                    break;
                default:
                    this.handleDefaultError(data);
            }
            return;
        }

        if (error instanceof TimeoutError) {
            toast.error('The request timed out. Please try again.');
            return;
        }

        toast.error('An unexpected error occurred');
    }

    private static async parseResponse(error: HTTPError): Promise<any> {
        try {
            return await error.response.json();
        } catch {
            return {};
        }
    }

    private static handleBadRequest(data: any): void {
        toast.error(data?.message ?? 'Invalid request');
    }

    private static handleUnauthorized(): void {
        toast.error('Session expired. Please login again.');
        localStorage.clear();
        window.location.href = '/login';
    }

    private static handleForbidden(): void {
        toast.error("You don't have permission to access this resource");
    }

    private static handleNotFound(data: any): void {
        toast.error(data?.message ?? 'Resource not found');
    }

    private static handleValidationError(data: any): void {
        const errors = data?.details ?? {};
        Object.values(errors)
            .flat()
            .forEach((message: string) => toast.error(message));
    }

    private static handleServerError(): void {
        toast.error('An internal server error occurred. Please try again later.');
    }

    private static handleDefaultError(data: any): void {
        toast.error(data?.message ?? 'An error occurred');
    }
}
