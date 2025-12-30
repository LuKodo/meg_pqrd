export const Row = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`grid grid-cols-12 gap-2 ${className ? className : ''}`}>
            {children}
        </div>
    )
}

export const Col = ({ children, md, xs, lg, sm, className }: { children?: React.ReactNode, md?: number, xs?: number, lg?: number, sm?: number, className?: string }) => {
    return (
        <div className={`col-span-${md ? md : ''} ${className ? className : ''}`}>
            {children}
        </div>
    )
}