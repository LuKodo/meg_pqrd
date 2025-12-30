import { Fragment } from "react/jsx-runtime";
import { Link, useLocation } from "wouter";
import { useFetchMenuItems } from "../../hooks/useFetchMenuItems";

export const Menu = () => {
	const { menu } = useFetchMenuItems();
	const [location, _setLocation] = useLocation();

	return (
		<>
			{menu
				?.sort((a, b) => a.order - b.order)
				.filter((sub) => sub.parent === 0)
				.map((parentItem) => (
					<Fragment key={parentItem.id}>
						<div className="flex items-center justify-between px-5">
							<p className="text- text-gray-500 uppercase">{parentItem.name}</p>
							<button className="p-1 bg-gray-50 border border-gray-200 rounded-md md:hidden">

							</button>
						</div>

						<div className="my-5">
							{menu
								?.filter((sub) => sub.parent === parentItem.id)
								.map((subItem) => (
									<Link
										key={subItem.id}
										className={
											location ===
												`${parentItem.link}${subItem.link}`
												? "py-2.5 block pl-11 border-l-4 hover:transition-[background] hover:duration-300 dark:hover:bg-indigo-300/10 bg-indigo-500/10 hover:bg-indigo-500/10 dark:bg-indigo-300/20 border-indigo-500"
												: "py-2.5 block pl-11 border-l-4 hover:transition-[background] hover:duration-300 hover:bg-indigo-500/5 dark:hover:bg-indigo-300/10 border-transparent"
										}
										to={`${parentItem.link}${subItem.link}`}
										aria-expanded="false"
									>
										<i className={`${subItem.icon} mr-2`}></i>
										<span className="hide-menu">{subItem.name}</span>
									</Link>
								))}
						</div>
					</Fragment >
				))}
		</>
	);
};
