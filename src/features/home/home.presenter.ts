// Home/Dashboard feature presentation/formatting logic
import type { DashboardMetrics, ProductMetric, TimeMetric } from './home.model';

/**
 * Format metrics for time chart display
 */
export const formatTimeMetricsForChart = (metrics: DashboardMetrics): TimeMetric[] => {
    return [
        {
            label: 'A Tiempo',
            value: metrics.inTime,
            color: '#10b981' // green
        },
        {
            label: 'En Alerta',
            value: metrics.outTime,
            color: '#f59e0b' // amber
        },
        {
            label: 'Fuera de Tiempo',
            value: metrics.onDanger,
            color: '#ef4444' // red
        }
    ];
};

/**
 * Format product metrics for chart display
 */
export const formatProductMetricsForChart = (metrics: ProductMetric[]) => {
    return {
        labels: metrics.map(m => m.productName),
        datasets: [{
            label: 'Cantidad',
            data: metrics.map(m => m.count),
            backgroundColor: [
                '#3b82f6',
                '#8b5cf6',
                '#ec4899',
                '#f59e0b',
                '#10b981',
                '#06b6d4'
            ]
        }]
    };
};

/**
 * Format percentage for display
 */
export const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
};

/**
 * Format count with label
 */
export const formatCount = (count: number, singular: string, plural: string): string => {
    return `${count} ${count === 1 ? singular : plural}`;
};

/**
 * Get status color based on metric type
 */
export const getMetricStatusColor = (type: 'inTime' | 'outTime' | 'onDanger'): string => {
    const colors = {
        inTime: 'text-green-600 bg-green-50',
        outTime: 'text-amber-600 bg-amber-50',
        onDanger: 'text-red-600 bg-red-50'
    };
    return colors[type];
};
