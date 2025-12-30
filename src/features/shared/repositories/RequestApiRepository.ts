import { URLBuilder, type DeepPartial, type BackendFilter } from "@/utils";
import type {
    RequestsProps,
    RequestResponse,
    PaginatedData,
    iRequestOne,
    iRequest,
    iRequestView
} from "@/entities";
import type { responseMasive } from "@/entities";
import { api } from "@/http";

export enum ComparisonOperator {
    EQUAL = 'eq',
    NOT_EQUAL = 'neq',
    GREATER_THAN = 'gt',
    GREATER_THAN_OR_EQUAL = 'gte',
    LESS_THAN = 'lt',
    LESS_THAN_OR_EQUAL = 'lte',
    LIKE = 'like',
    ILIKE = 'ilike',
    BETWEEN = 'between',
    IN = 'in',
    NOT_IN = 'not_in',
    IS_NULL = 'is_null',
    IS_NOT_NULL = 'is_not_null'
}

export class RequestApiRepository {
    constructor() { }

    async getCountRequests(params: RequestsProps): Promise<RequestResponse[]> {
        const response = await api.get(`request/home?${URLBuilder.queryParams(params)}`).json();
        return response as RequestResponse[];
    }
    async getDetails(requestId: string): Promise<iRequestView> {
        const response = await api.get(`request/${requestId}`).json();
        return response as iRequestView;
    }
    async setFailedRequest(affiliateId: number, userId: number): Promise<{ message: string }> {
        const response = await api.get(`request/failed?userId=${userId}&affiliateId=${affiliateId}`).json();
        return response as { message: string };
    }
    async getStats(username: string): Promise<PaginatedData<iRequestView>> {
        const filter = {
            operator: ComparisonOperator.EQUAL,
            field: 'username',
            value: username
        }
        const response = await api.post<PaginatedData<iRequestView>>(`request/params/1/10000000`, { json: [filter] }).json();
        return response as PaginatedData<iRequestView>;
    }
    async getPaginatedRequests(filters: BackendFilter[], page: number, perPage: number): Promise<PaginatedData<iRequestView>> {
        const response = await api.post<PaginatedData<iRequestView>>(`request/params/${page}/${perPage}`, { json: filters }).json();
        return response as PaginatedData<iRequestView>;
    }
    async createRequest(request: DeepPartial<iRequestOne>): Promise<iRequest[]> {
        const response = await api.post("request", { json: request }).json();
        return response as iRequest[];
    }
    async createBulkRequest(request: DeepPartial<iRequestOne>[]): Promise<responseMasive> {
        const response = await api.post("request/bulk", { json: request }).json();
        return response as responseMasive;
    }
    async updateRequest(params: { id: string; request: DeepPartial<iRequest> }) {
        const response = await api.patch(`request/${params.id}`, { json: params.request }).json();
        return response as responseMasive;
    }
    async markAsDeliveredBulk(
        payload: {
            id: string;
            userId: number;
            delivered: string;
            observations?: string;
        }[],
    ): Promise<responseMasive> {
        const response = await api.put(
            `request/bulk/delivered`,
            { json: payload },
        ).json();
        return response as responseMasive;
    }
    async markAsScheduledBulk(payload: {
        id: string;
        userId: number;
        self_management_date?: string;
    }[]): Promise<responseMasive> {
        const response = await api.put(`request/bulk/scheduled`, { json: payload }).json();
        return response as responseMasive;
    }
    async markAsSendedBulk(payload: {
        id: string;
        userId: number;
        sended: string;
        guide_number: string;
        conveyorId: number;
        manual: boolean;
        observations?: string;
    }[]): Promise<responseMasive> {
        const response = await api.put(`request/bulk/sended`, { json: payload }).json();
        return response as responseMasive;
    }
    async markAsDigitedBulk(payload: {
        id: string;
        userId: number;
        digited: string;
        auth_number: string;
        formula: string;
        observations?: string;
    }[]): Promise<responseMasive> {
        const response = await api.put(`request/bulk/digited`, { json: payload }).json();
        return response as responseMasive;
    }
    async markAsFailedBulk(payload: {
        id: string;
        userId: number;
        observations?: string;
    }[]): Promise<responseMasive> {
        const response = await api.put(`request/bulk/failed`, { json: payload }).json();
        return response as responseMasive;
    }
    async markAsAppliedBulk(payload: {
        id: string;
        userId: number;
        applied: string;
    }[]): Promise<responseMasive> {
        const response = await api.put(`request/bulk/applied`, { json: payload }).json();
        return response as responseMasive;
    }
    async markAsNulledBulk(payload: {
        id: string;
        userId: number;
        observations?: string;
    }[]): Promise<responseMasive> {
        const response = await api.put(`request/bulk/nulled`, { json: payload }).json();
        return response as responseMasive;
    }
    async markAsOpenBulk(
        payload: {
            id: string;
            userId: string;
            modelId: number;
            auth_number: string;
            observations?: string;
        }[],
    ): Promise<responseMasive> {
        const response = await api.put(`request/bulk/open`, { json: payload }).json();
        return response as responseMasive;
    }
    async getDetailsBulk(requestIds: string[]): Promise<iRequest[]> {
        const response = await api.post<iRequest[]>(`request/details`, {
            json: {
                operator: ComparisonOperator.IN,
                field: 'id',
                value: requestIds
            }
        }).json();
        return response as iRequest[];
    }
    async markAsScheduled(params: {
        id: string;
        userId: string;
        address?: string;
        modelId?: number;
        name?: string;
        self_management_date?: string;
        cityId?: string;
        channel?: string;
    }): Promise<void> {
        const response = await api.patch(`request/${params.id}/schedule`, {
            json: {
                userId: params.userId,
                address: params.address,
                modelId: params.modelId,
                name: params.name,
                cityId: params.cityId,
                self_management_date: params.self_management_date,
                channel: params.channel
            }
        }).json();
        return response as void;
    }
    async markAsDigited(params: {
        id: string;
        userId: string;
        digited: string;
        auth_number: string;
        formula: string;
        observations?: string;
    }): Promise<void> {
        const response = await api.patch(`request/${params.id}/digited`, {
            json: {
                userId: params.userId,
                digited: params.digited,
                auth_number: params.auth_number,
                formula: params.formula,
                observations: params.observations
            }
        }).json();
        return response as void;
    }
    async markAsSended(params: {
        id: string;
        userId: string;
        sended: string;
        guide_number: string;
        conveyorId: number;
        manual: boolean;
        observations?: string;
    }): Promise<void> {
        const response = await api.patch(`request/${params.id}/sended`, {
            json: {
                userId: params.userId,
                sended: params.sended,
                guide_number: params.guide_number,
                conveyorId: params.conveyorId,
                manual: params.manual,
                observations: params.observations
            }
        }).json();
        return response as void;
    }
    async markAsFailed(params: {
        userId: string;
        affiliateId: number;
    }): Promise<void> {
        const response = await api.patch(`request/failed`, {
            json: {
                userId: params.userId,
                affiliateId: params.affiliateId
            }
        }).json();
        return response as void;
    }
    async markAsDelivered(params: {
        id: string;
        userId: string;
        delivered: string;
    }): Promise<void> {
        const response = await api.patch(`request/${params.id}/delivered`, {
            json: {
                userId: params.userId,
                delivered: params.delivered
            }
        }).json();
        return response as void;
    }
    async markAsNulled(params: {
        id: string;
        userId: string;
        observations?: string
    }): Promise<void> {
        const response = await api.patch(`request/${params.id}/nulled`, {
            json: {
                userId: params.userId,
                observations: params.observations
            }
        }).json();
        return response as void;
    }
    async markAsRedZone(params: {
        id: string;
        userId: string;
    }): Promise<void> {
        const response = await api.patch(`request/${params.id}/redzone`, {
            json: {
                userId: params.userId,
                observations: "Afiliado se encuentra en zona roja"
            }
        }).json();
        return response as void;
    }
    async markAsRestored(params: {
        id: string;
        userId: string;
        observations?: string
    }): Promise<void> {
        const response = await api.patch(`request/${params.id}/restored`, {
            json: {
                userId: params.userId,
                observations: params.observations
            }
        }).json();
        return response as void;
    }
    async markAsDeliveredFailed(params: {
        id: string;
        userId: string;
        delivered: string;
        observations?: string
    }): Promise<void> {
        const response = await api.patch(`request/${params.id}/delivered_failed`, {
            json: {
                userId: params.userId,
                delivered: params.delivered,
                observations: params.observations
            }
        }).json();
        return response as void;
    }
}
