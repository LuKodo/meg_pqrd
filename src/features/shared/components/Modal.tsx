interface ModalProps {
    children: React.ReactNode;
    show: boolean;
    onClose: () => void;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'max';
}

export const Modal = ({ children, show, onClose, size = 'md' }: ModalProps) => {
    if (!show) return null;

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
        max: 'max-w-full'
    };

    return (
        <div className="modal modal-open" onClick={onClose}>
            <div
                className={`modal-box ${sizeClasses[size]}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};


interface ModalHeaderProps {
    children: React.ReactNode;
    onClose: () => void;
}

export const ModalHeader = ({ children, onClose }: ModalHeaderProps) => {
    return (
        <div className="flex justify-between items-center mb-4">
            {children}
            <button
                onClick={onClose}
                className="btn btn-sm btn-circle btn-ghost"
            >
                ✕
            </button>
        </div>
    );
};


export const ModalTitle = ({ children }: { children: React.ReactNode }) => {
    return (
        <h3 className="font-bold text-lg">{children}</h3>
    );
};

export const ModalBody = ({ children, style, className }: { children: React.ReactNode, style?: React.CSSProperties, className?: string }) => {
    return (
        <div style={style} className={`modal-body ${className || ''}`}>{children}</div>
    )
}

export const ModalFooter = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`modal-footer ${className || ''}`}>{children}</div>
    )
}