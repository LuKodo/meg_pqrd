import ky from "ky";

let headers = {};
if (localStorage.getItem("access_token") !== null) {
	headers = {
		Authorization: `Bearer ${localStorage.getItem("access_token")}`,
	};
} else {
	headers = {};
}

const instance = ky.create({
	prefixUrl: import.meta.env.VITE_URI_API,
	timeout: 60000,
	retry: {
		limit: 3,
	},
	headers
});

export { instance };
