import type { Affiliate, AffiliateCreateDTO } from "@/entities";
import { api } from "@/http";

interface searchAffiliate {
    document_number: string,
    document_type: string,
}

export class AffiliateHttpRepository {
    constructor() { }
    async getAffiliateByDocument(params: searchAffiliate): Promise<Affiliate | null> {
        const data = [{
            "param": "document_number",
            "operator": "eq",
            "value": params.document_number
        }, {
            "param": "document_type",
            "operator": "eq",
            "value": params.document_type
        }];

        const response = await api.post<Affiliate[]>(`affiliate/params`, { json: data }).json();
        return response[0];
    }

    async createAffiliate(affiliate: AffiliateCreateDTO): Promise<{ success: boolean, data?: Affiliate, error?: any }> {
        try {
            affiliate.address = "";
            const response = await api.post<Affiliate>('affiliate', { json: affiliate }).json();
            return { success: true, data: response };
        } catch (error) {
            throw error;
        }
    }

    async searchAffiliateByRigthsValidator(params: searchAffiliate): Promise<Affiliate> {
        const data = {
            "resourceType": "Parameters",
            "id": "CorrelationId",
            "parameter": [
                {
                    "name": "documentType",
                    "valueString": params.document_type
                },
                {
                    "name": "documentId",
                    "valueString": params.document_number
                }
            ]
        }

        const Responsetoken = await fetch('https://gcp-mutualser-keycloak-prod.appspot.com/auth/realms/right-validation/protocol/openid-connect/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'password',
                client_id: 'right-validation',
                client_secret: '9bfa90db-b9e1-48ea-9b3e-403e6993f346',
                username: 'pharmaser-prevrenal',
                password: 'Ph4rM453rPr3Vr3N41'
            })
        })
        const tokenResponse = await Responsetoken.json();
        const token = tokenResponse.access_token;

        const response = await fetch('https://validador-derechos.mutualser.com/validateRights/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        const responseJson = await response.json();

        const affiliate: Affiliate = {
            address: responseJson.entry[0].address[0].text || '',
            document_type: responseJson.entry[0].identifier[0].value,
            document_number: responseJson.entry[0].identifier[1].value,
            cellphone: responseJson.entry[0].telecom[0].value === 'Phone Not found' ? (responseJson.entry[0].telecom[1].value || '') : '',
            lastname_1: responseJson.entry[0].name[0].family.split('|')[0].split('=')[1] || '',
            lastname_2: responseJson.entry[0].name[0].family.split('|')[1].split('=')[1] || '',
            firstname: responseJson.entry[0].name[0].given[0] || '',
            surname: responseJson.entry[0].name[0].given[1] || '',
            phone: responseJson.entry[0].telecom[0].value === 'Phone Not found' ? (responseJson.entry[0].telecom[1].value || '') : '',
            isTutela: false
        }

        return affiliate;
    }
}