import { Link } from "wouter";
import { useFetchMenuItems } from "../../hooks/useFetchMenuItems";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui";
import { Logo } from "./Logo";
import { DynamicIcon } from "lucide-react/dynamic";

const isActive = "py-5 block border-l-4 hover:transition-[background] hover:duration-300 dark:hover:bg-indigo-300/10 bg-indigo-500/10 hover:bg-indigo-500/10 dark:bg-indigo-300/20 border-indigo-500";
const isInactive = "py-5 block border-l-4 hover:transition-[background] hover:duration-300 hover:bg-indigo-500/5 dark:hover:bg-indigo-300/10 border-transparent";

const normalize = (path: string) =>
	path.replace(/\/+$/, '') || '/';

function isMenuItemActive(
	locationPath: string,
	itemPath: string
): boolean {
	const current = normalize(locationPath);
	const item = normalize(itemPath);

	// Regla estricta para home
	if (item === '/home') {
		return current === '/home';
	}

	// Coincidencia exacta
	if (current === item) {
		return true;
	}

	// Coincidencia por prefijo (rutas hijas)
	return current.startsWith(item + '/');
}



export const Menu = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
	const { menu } = useFetchMenuItems();

	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:p-1.5!"
						>
							<Logo />
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				{menu
					?.sort((a, b) => a.order - b.order)
					.filter((sub) => sub.parent === 0)
					.map((parentItem) => (
						<SidebarGroup key={parentItem.id} className="group-data-[collapsible=icon]:hidden">
							<SidebarGroupLabel className="font-semibold">{parentItem.name}</SidebarGroupLabel>
							<SidebarGroupContent className="flex flex-col gap-2">
								<SidebarMenu>
									{menu
										?.filter((sub) => sub.parent === parentItem.id)
										.map((subItem) => (
											<SidebarMenuItem key={subItem.id}>
												<SidebarMenuButton asChild>
													<Link
														href={`${parentItem.link}${subItem.link}`}
														className={isMenuItemActive(location.pathname, `${parentItem.link}${subItem.link}`) ? isActive : isInactive}
													>
														<DynamicIcon name={subItem.icon} color="blue" size={48} />
														<span className="text-base font-semibold">{subItem.name}</span>
													</Link>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))
									}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup >
					))}
			</SidebarContent>
		</Sidebar >
	);
};
