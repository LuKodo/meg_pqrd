const bgs = {
    primary: "badge-primary",
    secondary: "badge-secondary",
    success: "badge-success",
    info: "badge-info",
    warning: "badge-warning",
    error: "badge-error",
}

export const Badge = ({ children, bg, pill, className }: { children: React.ReactNode, bg?: string, pill?: boolean, className?: string }) => {
    return (
        <span className={`badge badge-soft ${bgs[bg as keyof typeof bgs]} ${pill ? "rounded-pill" : ""} ${className || ""}`}>{children}</span>
    )
}
