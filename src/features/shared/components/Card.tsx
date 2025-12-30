export const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`card bg-white shadow border border-gray-200 ${className}`}>
            {children}
        </div>
    )
}

export const CardBody = ({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => {
    return (
        <div className={`card-body ${className}`} style={style}>
            {children}
        </div>
    )
}

export const CardFooter = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="card-footer">
            {children}
        </div>
    )
}

export const CardTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <h5 className={`card-title ${className}`}>{children}</h5>
    )
}

export const CardHeader = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="card-header">
            {children}
        </div>
    )
}
