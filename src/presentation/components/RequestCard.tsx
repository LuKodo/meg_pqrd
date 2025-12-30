import React from 'react';

interface RequestCardProps {
    title: string;
    count: string;
    icon: string;
    onClick: () => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ title, count, icon, onClick }) => {
    return (
        <div className="hstack align-items-center gap-3 cardInfo p-2 rounded" onClick={onClick}>
            <div className="d-flex p-2 align-items-center justify-content-center round-48 rounded bg-success-subtle flex-shrink-0">
                {icon}
            </div>
            <div>
                <h6 className="mb-0">{Number(count)} Solicitudes</h6>
                <span>{title}</span>
            </div>
        </div>
    );
};

export default RequestCard;