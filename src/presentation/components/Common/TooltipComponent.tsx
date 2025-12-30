export const Tooltip = ({ id, children, title }: { id?: string; children: React.ReactNode; title: string }) => (
	<div className="tooltip" data-tip={title}>
		{children}
	</div>
);
