import { httpPQRD } from "@/http/PQRD";
import { jwtSign } from "@/utils";
import { useEffect, useState } from "react";
import { iPQRD } from "../pqrd.model";
import { PaginatedData } from "@/entities";

interface usePQRSProps {
    page?: number;
    limit?: number;
}

export const usePQRS = ({ page = 1, limit = 10 }: usePQRSProps) => {
    const [pqrds, setPqrds] = useState<PaginatedData<iPQRD>>({
        data: [],
        currentPage: page,
        totalPages: 0,
        pageSize: limit,
    });

    const pqrd = (num_rad: string) => {
        const getPQRD = async () => {
            const token = await jwtSign({ payload: { role: "web_user" } });
            const response = await httpPQRD.get<iPQRD[]>(`pqrs?id=eq.${num_rad}&select=*,pqrs_peticionario(*),assignment(users(username))`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }).json();

            return response[0];
        }

        return getPQRD();
    }

    useEffect(() => {
        const getPqrs = async () => {
            const token = await jwtSign({ payload: { role: "web_user" } });
            const response = await httpPQRD.get<iPQRD[]>(`pqrs?select=*,pqrs_peticionario(*),assignment(users(username))&limit=${limit}&offset=${page}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Prefer": "count=exact"
                },
            });

            const data = await response.json();
            const countResponse = response.headers.get("Content-Range");
            const count = countResponse?.split("/")[1];
            const totalPages = Math.ceil(Number(count) / limit);
            setPqrds({
                data,
                currentPage: page,
                totalPages,
                pageSize: limit,
            });
        }

        getPqrs();
    }, [page]);

    const createPQRD = async (pqr: iPQRD) => {
        const token = await jwtSign({ payload: { role: "web_user" } });

        if (!pqr.mutual_radicado) {
            const response = await httpPQRD.post<iPQRD[]>(`pqrs`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Prefer": "return=representation"
                },
                json: { ...pqr, person_response_type: "Correo Electronico" },
            }).json();
            setPqrds({
                data: [...pqrds.data, response[0]],
                currentPage: pqrds.currentPage,
                totalPages: pqrds.totalPages,
                pageSize: pqrds.pageSize,
            });

            return {
                success: true,
                level: "success",
                message: "PQRD creada exitosamente",
            };
        }

        const exists = pqrds.data.find((pqrd) => pqrd.mutual_radicado === pqr.mutual_radicado);

        if (exists) {
            return {
                success: false,
                level: "warning",
                message: "PQRD ya existe",
            };
        }

        const response = await httpPQRD.post<iPQRD[]>(`pqrs`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                "Prefer": "return=representation"
            },
            json: { ...pqr, person_response_type: "Correo Electronico" },
        }).json();
        setPqrds({
            data: [...pqrds.data, response[0]],
            currentPage: pqrds.currentPage,
            totalPages: pqrds.totalPages,
            pageSize: pqrds.pageSize,
        });

        return {
            success: true,
            level: "success",
            message: "PQRD creada exitosamente",
        };
    };

    return { pqrds, createPQRD, pqrd };
};