import { type FC, type ReactNode } from "react";
import { Menu } from "./components/Menu";
import { SidebarInset, SidebarProvider } from "@/components/ui";

interface LayoutProps {
	children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<Menu variant="inset" />
			<SidebarInset>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
};
