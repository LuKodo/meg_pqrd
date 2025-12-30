type ShowProps = {
    when: boolean;
    fallback: any;
    children?: any;
};

export const Show = ({ when, fallback, children }: ShowProps) => {
    if (when) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
};