import { useEffect, useState } from "react";
import { useSessionManager } from "@/features/shared/hooks/useSessionManager";
import { iModule } from "@/entities";

const useFetchMenuItems = () => {
	const { getPages } = useSessionManager();
	const [menu, setMenu] = useState<iModule[]>([]);

	useEffect(() => {
		const fetchMenuItems = async () => {
			try {
				const menus: iModule[] = getPages();

				const parents = menus.filter((menu: iModule) => {
					if (menu.parent === 0) {
						return menu;
					}
				});

				const newArray = parents.reduce((acc: iModule[], parentItem: iModule) => {
					const matchingMenu = menus.filter(
						(menuItem: iModule) =>
							menuItem.parent === parentItem.id,
					);

					if (matchingMenu.length > 0) {
						acc = acc.concat(matchingMenu);
						acc.push(parentItem);
					}

					return acc;
				}, []);

				setMenu(newArray);
			} catch (error) {
				console.error("error fetching menu: ", error);
			}
		};

		fetchMenuItems();

		// Cleanup function if needed
		return () => {
			// Cleanup code here if necessary
		};
	}, []); // Empty dependency array to run the effect only once

	return { menu };
};

export { useFetchMenuItems };
