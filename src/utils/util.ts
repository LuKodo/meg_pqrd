import { DateTime } from "luxon";
import * as jose from 'jose'
import { IconBrandWhatsapp, IconMail, IconPhone, IconWorld } from "@/svg";

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET;

export const formatDocument = (document: string) => {
    switch (document.toLowerCase()) {
        case "cedula de ciudadanía":
            return "CC";
        case "adulto sin identificacion":
            return "ASI";
        case "carnet diplomático":
            return "CD";
        case "cedula de extranjería":
            return "CE";
        case "certificado nacido vivo":
            return "CNV";
        case "documento extranjero":
            return "DE";
        case "menor sin identificar":
            return "MSI";
        case "número único de identificación":
            return "NI";
        case "pasaporte":
            return "PA";
        case "pasaporte de la ONU":
            return "PONU";
        case "permiso especial de permanencia":
            return "PEP";
        case "permiso por protección temporal":
            return "PPT";
        case "registro civil":
            return "RC";
        case "salvo conducto de permanencia":
            return "SCP";
        case "tarjeta de identidad":
            return "TI";
        default:
            return "";
    }
}

export const channelToIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
        case "telefonico":
            return IconPhone;
        case "email":
            return IconMail;
        case "whatsapp":
            return IconBrandWhatsapp;
        case "web":
            return IconWorld;
        default:
            return IconWorld;
    }
}

export const semaforoToColor = (initDate: string, endDate: string, type: string) => {
    const today = DateTime.fromISO(initDate);
    const targetDate = DateTime.fromISO(endDate);

    // Diferencia en horas
    const diffHours = Math.ceil(
        Math.abs(targetDate.toMillis() - today.toMillis()) / 3600000
    );

    const limit = getHoursLimit(type);
    const yellowLimit = limit + 24;

    if (diffHours <= limit) return "bg-red-500";
    if (diffHours <= yellowLimit) return "bg-yellow-500";
    return "bg-green-500";
};

const getHoursLimit = (type: string) => {
    const t = type.toLowerCase();

    const channels5 = ["web", "email", "aliance", "buzon", "telefonico"];
    if (channels5.includes(t)) return 5 * 24;

    const timeMap: Record<string, number> = {
        vital: 24,
        priority: 48,
        simple: 72
    };

    return timeMap[t] ?? 1;
};

// Genera el token para firmar las peticiones
export const jwtSign = async ({ payload }: { payload: any }) => {
    return await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(new TextEncoder().encode(JWT_SECRET));
}