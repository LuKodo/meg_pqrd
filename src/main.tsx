import ReactDOM from "react-dom/client";
import "bootstrap-icons/font/bootstrap-icons.css";
import "sweetalert2/dist/sweetalert2.css";

import { App } from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

const queryClient = new QueryClient();
const asyncStoragePersister = createAsyncStoragePersister({
	storage: window.localStorage,
});
persistQueryClient({
	queryClient,
	persister: asyncStoragePersister,
});

const root = ReactDOM.createRoot(document.getElementById("main-wrapper") as HTMLElement);
root.render(
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>
);
