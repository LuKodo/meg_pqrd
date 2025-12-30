import type { FC, SetStateAction } from "react";
import {
	requestStatePQRSMachine,
	type StateAction,
	StatusPQRS
} from "@/utils";
import { useSessionManager } from "@/features/shared/hooks/useSessionManager";
import { Col, Row } from "@/features/shared/components/Grid";
import { Button } from "@/features/shared/components/Button";

interface ToolBarProps {
	status: string;
	schedule: (e: { preventDefault: () => void }) => Promise<void>;
	confirmTyping: (value: SetStateAction<boolean>) => void;
	manualShipping: (value: SetStateAction<boolean>) => void;
	cancel: (value: SetStateAction<boolean>) => void;
	sendType: (value: SetStateAction<number>) => void;
	normalShipment: (value: SetStateAction<boolean>) => void;
	confirmDelivery: (value: SetStateAction<boolean>) => void;
	confirmDeliveryFailed: (value: SetStateAction<boolean>) => void;
	failed: () => void;
	redzone: () => void;
	restore: (value: SetStateAction<boolean>) => void;
}

export const ToolBarPQRS: FC<ToolBarProps> = ({
	status,
	schedule,
	confirmTyping,
	manualShipping,
	cancel,
	sendType,
	normalShipment,
	confirmDelivery,
	confirmDeliveryFailed,
	failed,
	redzone,
	restore
}) => {
	const { userData } = useSessionManager();

	const executeAction = (actionId: string) => {
		switch (actionId) {
			case "schedule":
				schedule({ preventDefault: () => { } });
				break;
			case "manualShipping":
				sendType(13);
				manualShipping(true);
				break;
			case "normalShipment":
				sendType(4);
				normalShipment(true);
				break;
			case "confirmTyping":
				confirmTyping(true);
				break;
			case "confirmDelivery":
				confirmDelivery(true);
				break;
			case "confirmDeliveryFailed":
				confirmDeliveryFailed(true);
				break;
			case "cancel":
				cancel(true);
				break;
			case "failed":
				failed();
				break;
			case "redzone":
				redzone();
				break;
			case "restore":
				restore(true);
				break;
			default:
				break;
		}
	};

	const availableActions = requestStatePQRSMachine.getAvailableActions(
		status as StatusPQRS,
		userData?.role?.name || ""
	);

	return (
		<>
			<div
				className="position-fixed p-3"
				style={{ zIndex: 99, bottom: "5px", right: "20px" }}
			>
				<Row>
					<Col md={4} className="offset-4">
						<div className="d-flex flex-column">
							{availableActions.map((action: StateAction<StatusPQRS>) => {
								return (
									<Button
										key={action.label}
										variant={action.variant}
										className="tooltip--tp left"
										data-tooltip={action.label}
										onClick={() => executeAction(String(action.function))}
									>
										{requestStatePQRSMachine.getIcon(requestStatePQRSMachine.findStateByValue(action.nextState))}
									</Button>
								);
							})}
						</div>
					</Col>
				</Row>
			</div>
		</>
	);
};