import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { FC } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface TimeMetricsChartProps {
    labels: string[],
    data: number[]
}

export const TimeMetricsChart: FC<TimeMetricsChartProps> = ({ data, labels }) => {
    const dataChart = {
        labels,
        datasets: [{
            label: 'Solicitudes',
            data,
            backgroundColor: [
                'rgba(75, 192, 104, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 104, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1,
            hoverOffset: 4
        }]
    };

    return (
        <div className="w-full">
            <div className="">
                <Doughnut  data={dataChart} />
            </div>
        </div>
    );
};