import { useAuthStore } from "@/features/auth/auth.store";

export const useSessionManager = () => {
	const user = useAuthStore(s => s.user)

	const getRole = () => {
		if (user) {
			return user.role;
		}
		return 'Invitado'
	};

	const getPages = () => {
		if (user) {
			return user.modules;
		}
	};

	const getUsername = () => {
		if (user) {
			return user.username;
		}
	};

	const getName = () => {
		if (user) {
			return user.name;
		}
	};

	const getID = () => {
		if (user) {
			return user.id;
		}
	};

	const getSession = () => {
		if (user) {
			return true;
		}

		return false;
	};

	const getZones = () => {
		const storedSession = localStorage.getItem("zones") as string;
		if (storedSession) {
			const sessionObject = JSON.parse(storedSession);
			return sessionObject;
		}
		return [];
	}

	return {
		userData: user,
		getRole,
		getUsername,
		getID,
		getSession,
		getPages,
		getName,
		getZones
	};
};
