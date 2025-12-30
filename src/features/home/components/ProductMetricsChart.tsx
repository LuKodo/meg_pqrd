import type { FC } from "react";

interface ProductMetricsChartProps {
    labels: string[],
    data: number[]
}

export const ProductMetricsChart: FC<ProductMetricsChartProps> = ({ data, labels }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Solicitud</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody className="overflow-x">
                {data === null ? (
                    <tr>
                        <td>No hay datos</td>
                    </tr>
                ) : (
                    <>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item}</td>
                                <td>{labels[index]}</td>
                                <td>{item}</td>
                            </tr>
                        ))}
                    </>
                )}


            </tbody>
        </table>
    );
};