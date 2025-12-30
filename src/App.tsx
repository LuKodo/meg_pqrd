import { Suspense } from "react";
import { Switch as BrowserRouter } from "wouter";

import { LoadingAll } from "./presentation/components"
import { publicRoutes, privateRoutes } from "./routes";

import { Toaster } from "sonner";
import { AuthProvider } from "@/features/shared/context";

export const App = () => {
	return (
		<AuthProvider>
			<Toaster />
			<BrowserRouter>
				<Suspense fallback={<LoadingAll />}>
					{publicRoutes}
					{privateRoutes}
				</Suspense>
			</BrowserRouter>
		</AuthProvider>
	);
};
