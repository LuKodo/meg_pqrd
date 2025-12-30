// Home/Dashboard feature types and business rules
import type { iRequestView } from '../request/request.model';

export interface DashboardMetrics {
    inTime: number;
    outTime: number;
    onDanger: number;
}

export interface ProductMetric {
    productName: string;
    count: number;
    percentage: number;
}

export interface TimeMetric {
    label: string;
    value: number;
    color: string;
}

// Business rules for dashboard calculations
export const calculateTimeMetrics = (requests: iRequestView[]): DashboardMetrics => {
    const now = new Date();
    const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

    const inTime = requests.filter(req => {
        const programedDate = new Date(req.programed_date);
        return programedDate > twoDaysFromNow;
    }).length;

    const outTime = requests.filter(req => {
        const programedDate = new Date(req.programed_date);
        return programedDate <= twoDaysFromNow && programedDate >= now;
    }).length;

    const onDanger = requests.filter(req => {
        const programedDate = new Date(req.programed_date);
        return programedDate < now;
    }).length;

    return { inTime, outTime, onDanger };
};

export const calculateProductMetrics = (requests: iRequestView[]): ProductMetric[] => {
    const productCounts = new Map<string, number>();

    requests.forEach(req => {
        const product = req.medicamento || 'Sin producto';
        productCounts.set(product, (productCounts.get(product) || 0) + 1);
    });

    const total = requests.length;
    const metrics: ProductMetric[] = [];

    productCounts.forEach((count, productName) => {
        metrics.push({
            productName,
            count,
            percentage: total > 0 ? (count / total) * 100 : 0
        });
    });

    return metrics.sort((a, b) => b.count - a.count);
};
