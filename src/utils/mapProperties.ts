import type { iModel } from "@/entities/Model";
import type { iIPS } from "@/entities/Ips";

export class mapProperties {
    private models: iModel[]
    private ipss: iIPS[]

    constructor() {
        this.models = localStorage.getItem("models") ? JSON.parse(localStorage.getItem("models")!) : [];
        this.ipss = localStorage.getItem("ips") ? JSON.parse(localStorage.getItem("ips")!) : [];
    }

    findModelByName(name: string): iModel | undefined {
        return this.models.find(model => model.name?.toLowerCase() === name.toLowerCase())
    }

    findIpsByName(name: string): iIPS | undefined {
        return this.ipss.find(ips => ips.name?.toLowerCase() === name.toLowerCase())
    }
}