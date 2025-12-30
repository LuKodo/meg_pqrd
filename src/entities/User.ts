import type { iHeadquarter } from "@/entities/Headquarter.ts";
import type { iRole } from "@/entities/Role.ts";

export interface iUserHeaquarters {
	user?: iUser;
	headquarter?: string;
}

export interface iUser {
	id?: number;
	username: string;
	password?: string;
	name?: string;
	headquarter?: iHeadquarter;
	status?: string;
	mail?: string;
	audipharma?: boolean;
	confirm_password?: string;
	role?: iRole;
	user_headquarter?: iUserHeaquarters[];
}

export interface iChangePassword {
	new_password: string;
	confirm_new_password: string;
}
