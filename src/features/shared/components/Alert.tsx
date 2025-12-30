import { IconAlertTriangle, IconCheck, IconCircleX, IconExclamationCircle } from "@/svg";

export const Alert = ({
    title,
    description,
    variant,
}: {
    title: string;
    description: string;
    variant: "success" | "danger" | "warning" | "info";
}) => {
    const Icon = Icons[variant];

    return (
        <div className={`alert ${Variants[variant]}`} role="alert">
            <div className="alert-icon">
                <Icon />
            </div>
            <div>
                <h4 className="alert-heading">{title}</h4>
                <div className="alert-description">
                    {description}
                </div>
            </div>
        </div>

    );
};

const Icons = {
    success: IconCheck,
    danger: IconCircleX,
    warning: IconAlertTriangle,
    info: IconExclamationCircle,
}

const Variants = {
    success: "alert-success",
    danger: "alert-danger",
    warning: "alert-warning",
    info: "alert-info",
}