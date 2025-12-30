import { type FC, type ReactNode } from "react";
import { useSessionManager } from "../hooks/useSessionManager";
import { Logo } from "./components/Logo";
import { Menu } from "./components/Menu";
import { IconUser, IconPower } from "@/svg";

interface LayoutProps {
	children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
	const { getUsername, logout } = useSessionManager();
	return (
		<>
			<nav className="sticky top-0 z-50 flex items-center justify-between h-[72px] border-b border-gray-200/70 bg-white px-4 md:pr-14">
				<a href="#" className="hover:opacity-80 dark:hover:opacity-75 transition">
					<Logo />
				</a>

				<button type="button" className="bg-white text-gray-700 md:inline hidden text-sm hover:opacity-90 active:scale-95 transition-all w-50 h-11 rounded-full border border-gray-200">
					<div className="flex items-center gap-2 w-full justify-center">
						<IconUser />

						<span className="font-semibold">{getUsername()}</span>
						<i className="hover:text-red-500 cursor-pointer" onClick={logout} >
							<IconPower />
						</i>
					</div>
				</button>

				<button aria-label="menu-btn" type="button" className="menu-btn inline-block md:hidden active:scale-90 transition">
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#fff">
						<path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
					</svg>
				</button>
			</nav>

			<div className="flex">
				<aside className="max-md:absolute sticky top-18 bg-white z-20 thin-scrollbar font-medium w-72 pt-6 transition-transform duration-300 h-[calc(100vh-72px)] overflow-y-auto scrollbar max-md:-translate-x-full">
					<div className="my-5">
						<Menu />
					</div>
				</aside>
				<div className="relative flex-1 animate-fade-in overflow-y-auto px-4 md:pr-14 bg-base-200/60">
					{children}
				</div>
			</div>
		</>
	);
};
