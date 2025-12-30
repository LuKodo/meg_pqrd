import { ButtonHTMLAttributes } from "react"

const variants = {
    primary: "btn-soft btn-primary",
    secondary: "btn-soft btn-secondary",
    success: "btn-soft btn-success",
    info: "btn-soft btn-info",
    warning: "btn-soft btn-warning",
    error: "btn-soft btn-error",
}

const sizes = {
    xs: "btn-xs",
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
    xl: "btn-xl",
}

export const Button = ({ children, variant, size, className, ...props }: { children: React.ReactNode, variant?: string, size?: string, className?: string } & ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button className={`btn ${variants[variant as keyof typeof variants]} ${sizes[size as keyof typeof sizes]} ${className}`} {...props}>{children}</button>
    )
}