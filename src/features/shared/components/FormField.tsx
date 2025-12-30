import { FC, ReactNode } from "react";

interface FormFieldProps {
    label: string;
    error?: any;
    errorMessage?: string;
    children: ReactNode;
    className?: string;
}

export const FormField: FC<FormFieldProps> = ({ label, error, errorMessage = "Campo requerido", children, className = "mb-3 flex flex-col" }) => {
    return (
        <div className={className}>
            {label && <label className="label">{label}</label>}
            {children}
            {error && (
                <div className="flex justify-start">
                    <small className="badge badge-danger text-white font-medium bg-red-500">
                        {typeof error === 'object' && error.message ? error.message : errorMessage}
                    </small>
                </div>
            )}
        </div>
    );
};
