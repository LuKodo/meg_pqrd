const UserRoles = {
	Administrador: 'Administrador',
	Auxiliar: 'Auxiliar',
	SupervisorMEG: 'Supervisor MEG',
	Aceptacion: 'Aceptacion',
	GestorPharmaser: 'Gestor Pharmaser',
	Analista: 'Analista',
	LineaDeFrenteIPS: 'Linea de Frente IPS',
	Gestor: 'Gestor',
	LineaDeFrenteMutual: 'Linea de Frente Mutual',
	CambiosEstados: 'Cambios Estados',
	Coordinador: 'Coordinador',
	ExpUsuario: 'ExpUsuario',
} as const;

export const StatusRequestMap = [
	"Cargue_IPS",
	"Abierto",
	"Programado",
	"Digitado",
	"Entregado",
	"Enviado",
	"Devolucion",
	"Aplicado",
	"No_aplicado",
	"Anulado",
	"Fallecido",
];

export const StatusRequestPQRSMap = [
	"Abierto",
	"Programado",
	"Digitado",
	"Enviado",
	"Envio_manual",
	"Devolucion",
	"Entregado",
	"Fallecido",
	"Zona_Roja",
	"Reintegrado",
	"Anulado",
];

export interface StateDefinitionMEG {
	metadata: StateMetadata;
	actions: StateAction<StatusMEG>[];
}

export interface StateDefinitionPQRS {
	metadata: StateMetadata;
	actions: StateAction<StatusPQRS>[];
}

export interface StateMetadata {
	id: number;
	icon: string;
	label: string;
	color: 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' | null | undefined;
}

export interface StateAction<T> {
	label: string;
	variant: string;
	icon: string;
	function: string;
	nextState: T;
	allowedRoles: string[];
}

export class StatusPQRSMachine {
	private transitions: Map<StatusPQRS, StateDefinitionPQRS>;

	constructor() {
		this.transitions = new Map();
		this.setupTransitions();
	}

	private setupTransitions() {
		this.transitions.set(StatusPQRS.Abierto, {
			metadata: {
				id: 10,
				icon: 'folder-open',
				color: 'success',
				label: 'Abierto'
			},
			actions: [
				{
					function: 'schedule',
					label: 'Programar',
					variant: 'success',
					icon: 'square-check-big',
					nextState: StatusPQRS.Programado,
					allowedRoles: [UserRoles.CambiosEstados, UserRoles.Coordinador, UserRoles.Administrador]
				},
				{
					function: 'failed',
					label: 'Fallecido',
					variant: 'dark',
					icon: 'ribbon',
					nextState: StatusPQRS.Fallecido,
					allowedRoles: [UserRoles.CambiosEstados, UserRoles.Coordinador, UserRoles.Administrador]
				},
				{
					function: 'cancel',
					label: 'Anular',
					variant: 'danger',
					icon: 'circle-x',
					nextState: StatusPQRS.Anulado,
					allowedRoles: [UserRoles.CambiosEstados, UserRoles.Coordinador, UserRoles.Administrador, UserRoles.ExpUsuario]
				}
			]
		});

		this.transitions.set(StatusPQRS.Programado, {
			metadata: {
				id: 9,
				icon: 'calendar-check-2',
				color: 'contrast',
				label: 'Programado'
			},
			actions: [
				{
					function: 'redzone',
					label: 'Zona Roja',
					variant: 'danger',
					icon: 'triangle-alert',
					nextState: StatusPQRS.Zona_Roja,
					allowedRoles: [UserRoles.Auxiliar, UserRoles.CambiosEstados, UserRoles.Coordinador, UserRoles.Administrador]
				},
				{
					function: 'manualShipping',
					label: 'Envío Manual',
					variant: 'info',
					icon: 'package-check',
					nextState: StatusPQRS.Envio_manual,
					allowedRoles: [UserRoles.Auxiliar, UserRoles.CambiosEstados, UserRoles.Coordinador, UserRoles.Administrador]
				},
				{
					function: 'confirmTyping',
					label: 'Confirmar Digitación',
					variant: 'success',
					icon: 'keyboard',
					nextState: StatusPQRS.Digitado,
					allowedRoles: [UserRoles.Auxiliar, UserRoles.CambiosEstados, UserRoles.Coordinador, UserRoles.Administrador]
				},
				{
					function: 'failed',
					label: 'Fallecido',
					variant: 'dark',
					icon: 'ribbon',
					nextState: StatusPQRS.Fallecido,
					allowedRoles: [UserRoles.Auxiliar, UserRoles.CambiosEstados, UserRoles.Coordinador, UserRoles.Administrador]
				},
				{
					function: 'cancel',
					label: 'Anular',
					variant: 'danger',
					icon: 'circle-x',
					nextState: StatusPQRS.Anulado,
					allowedRoles: [UserRoles.Coordinador, UserRoles.Administrador]
				}
			]
		});

		this.transitions.set(StatusPQRS.Digitado, {
			metadata: {
				id: 8,
				icon: 'keyboard',
				color: 'warning',
				label: 'Digitado',
			},
			actions: [
				{
					function: 'normalShipment',
					label: 'Confirmar Envío',
					variant: 'info',
					icon: 'package-check',
					nextState: StatusPQRS.Enviado,
					allowedRoles: [UserRoles.Auxiliar, UserRoles.CambiosEstados, UserRoles.Coordinador, UserRoles.Administrador]
				},
				{
					function: 'failed',
					label: 'Fallecido',
					variant: 'dark',
					icon: 'ribbon',
					nextState: StatusPQRS.Fallecido,
					allowedRoles: [UserRoles.Auxiliar, UserRoles.CambiosEstados, UserRoles.Coordinador, UserRoles.Administrador]
				},
				{
					function: 'cancel',
					label: 'Anular',
					variant: 'danger',
					icon: 'circle-x',
					nextState: StatusPQRS.Anulado,
					allowedRoles: [UserRoles.Coordinador, UserRoles.Administrador]
				}
			]
		});

		this.transitions.set(StatusPQRS.Enviado, {
			metadata: {
				id: 4,
				icon: 'package-check',
				color: 'success',
				label: 'Enviado'
			},
			actions: [
				{
					function: 'confirmDelivery',
					label: 'Confirmar Entrega',
					variant: 'secondary',
					icon: 'square-check-big',
					nextState: StatusPQRS.Entregado,
					allowedRoles: [UserRoles.Auxiliar, UserRoles.CambiosEstados, UserRoles.Coordinador, UserRoles.Administrador]
				},
				{
					function: 'confirmDeliveryFailed',
					label: 'Confirmar devolución',
					variant: 'warning',
					icon: 'package-x',
					nextState: StatusPQRS.Devolucion,
					allowedRoles: [UserRoles.Auxiliar, UserRoles.CambiosEstados, UserRoles.Coordinador, UserRoles.Administrador]
				},
				{
					function: 'failed',
					label: 'Fallecido',
					variant: 'dark',
					icon: 'ribbon',
					nextState: StatusPQRS.Fallecido,
					allowedRoles: [UserRoles.Auxiliar, UserRoles.CambiosEstados, UserRoles.Coordinador, UserRoles.Administrador]
				}
				,
				{
					function: 'cancel',
					label: 'Anular',
					variant: 'danger',
					icon: 'circle-x',
					nextState: StatusPQRS.Anulado,
					allowedRoles: [UserRoles.Coordinador, UserRoles.Administrador]
				}
			]
		});

		this.transitions.set(StatusPQRS.Envio_manual, {
			metadata: {
				id: 13,
				icon: 'package-check',
				color: 'success',
				label: 'Envío Manual',
			},
			actions: [
				{
					function: 'confirmDelivery',
					label: 'Confirmar Entrega',
					variant: 'secondary',
					icon: 'square-check-big',
					nextState: StatusPQRS.Entregado,
					allowedRoles: [UserRoles.Auxiliar, UserRoles.CambiosEstados, UserRoles.Coordinador, UserRoles.Administrador]
				},
				{
					function: 'confirmDeliveryFailed',
					label: 'Confirmar devolución',
					variant: 'warning',
					icon: 'package-x',
					nextState: StatusPQRS.Devolucion,
					allowedRoles: [UserRoles.Auxiliar, UserRoles.CambiosEstados, UserRoles.Coordinador, UserRoles.Administrador]
				},
				{
					function: 'failed',
					label: 'Fallecido',
					variant: 'dark',
					icon: 'ribbon',
					nextState: StatusPQRS.Fallecido,
					allowedRoles: [UserRoles.CambiosEstados, UserRoles.Coordinador, UserRoles.Administrador]
				},
				{
					function: 'cancel',
					label: 'Anular',
					variant: 'danger',
					icon: 'circle-x',
					nextState: StatusPQRS.Anulado,
					allowedRoles: [UserRoles.Coordinador, UserRoles.Administrador]
				}
			]
		});

		this.transitions.set(StatusPQRS.Devolucion, {
			metadata: {
				id: 5,
				icon: 'package-x',
				color: 'warning',
				label: 'Devolucion',
			},
			actions:
				[
					{
						function: 'normalShipment',
						label: 'Confirmar Envío',
						variant: 'info',
						icon: 'package-check',
						nextState: StatusPQRS.Enviado,
						allowedRoles: [UserRoles.Auxiliar, UserRoles.CambiosEstados, UserRoles.Coordinador, UserRoles.Administrador]
					},
					{
						function: 'restore',
						label: 'Reintegrar',
						variant: 'info',
						icon: 'archive-restore',
						nextState: StatusPQRS.Reintegrado,
						allowedRoles: [UserRoles.Coordinador, UserRoles.Administrador]
					},
					{
						function: 'failed',
						label: 'Fallecido',
						variant: 'dark',
						icon: 'ribbon',
						nextState: StatusPQRS.Fallecido,
						allowedRoles: [UserRoles.CambiosEstados, UserRoles.Coordinador, UserRoles.Administrador]
					},
					{
						function: 'cancel',
						label: 'Anular',
						variant: 'danger',
						icon: 'circle-x',
						nextState: StatusPQRS.Anulado,
						allowedRoles: [UserRoles.Coordinador, UserRoles.Administrador]
					}
				]
		});

		this.transitions.set(StatusPQRS.Entregado, {
			metadata: {
				id: 2,
				icon: 'square-check',
				color: 'info',
				label: 'Entregado'
			},
			actions: []
		});

		this.transitions.set(StatusPQRS.Anulado, {
			metadata: {
				id: 1,
				icon: 'circle-x',
				color: 'danger',
				label: 'Anulado'
			},
			actions: []
		});

		this.transitions.set(StatusPQRS.Fallecido, {
			metadata: {
				id: 6,
				icon: 'ribbon',
				color: 'secondary',
				label: 'Fallecido'
			},
			actions: []
		});

		this.transitions.set(StatusPQRS.Reintegrado, {
			metadata: {
				id: 17,
				icon: 'archive-restore',
				color: 'contrast',
				label: 'Reintegrado'
			},
			actions: []
		});

		this.transitions.set(StatusPQRS.Zona_Roja, {
			metadata: {
				id: 18,
				icon: 'triangle-alert',
				color: 'danger',
				label: 'Zona Roja'
			},
			actions: [
				{
					function: 'cancel',
					label: 'Anular',
					variant: 'danger',
					icon: 'circle-x',
					nextState: StatusPQRS.Anulado,
					allowedRoles: [UserRoles.Coordinador, UserRoles.Administrador]
				}
			]
		});
	}

	public getStateId(state: StatusPQRS | null): number {
		if (!state) return 1;
		const stateDefinition = this.transitions.get(state);
		return stateDefinition ? stateDefinition.metadata.id : 1;
	}

	public getStateLabel(state: StatusPQRS): string {
		const stateDefinition = this.transitions.get(state);
		return stateDefinition ? stateDefinition.metadata.label : 'Anulado';
	}

	public getStateColor(state: StatusPQRS | null): 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' {
		if (!state) return 'contrast';
		const stateDefinition = this.transitions.get(state);
		return stateDefinition ? (stateDefinition.metadata.color ?? 'contrast') : 'contrast';
	}

	public getIcon(state: StatusPQRS | null): string {
		if (!state) return 'circle-help';
		const stateDefinition = this.transitions.get(state);
		return stateDefinition ? stateDefinition.metadata.icon : 'circle-question';
	}

	public getAllStates(): StatusMEG[] {
		return Object.values(StatusMEG);
	}

	public findStateByValue(value: string | null): StatusPQRS | null {
		for (const state of this.transitions.keys()) {
			if (state === value) {
				return state;
			}
		}
		return null;
	}

	public findStateById(id: number): StatusPQRS | null {
		for (const [state, definition] of this.transitions.entries()) {
			if (definition.metadata.id === id) {
				return state;
			}
		}
		return null;
	}

	public getAvailableActions(currentState: StatusPQRS, userRole: string): StateAction<StatusPQRS>[] {
		const stateActions = this.transitions.get(currentState);
		if (!stateActions) return [];

		return stateActions.actions.filter(action => {
			const hasRolePermission = action.allowedRoles.includes(userRole);

			return (hasRolePermission)
		});
	}
}

export const requestStatePQRSMachine = new StatusPQRSMachine();

export enum StatusPQRS {
	Abierto = "Abierto",
	Programado = "Programado",
	Envio_manual = "Envio_manual",
	Zona_Roja = "Zona_Roja",
	Digitado = "Digitado",
	Enviado = "Enviado",
	Devolucion = "Devolucion",
	Reintegrado = "Reintegrado",
	Entregado = "Entregado",
	Anulado = "Anulado",
	Fallecido = "Fallecido",
	Aplicado = "Aplicado",
	Cargue_IPS = "Cargue_IPS",
}

export enum StatusMEG {
	Anulado = "Anulado",
	Entregado = "Entregado",
	No_aplicado = "No_aplicado",
	Enviado = "Enviado",
	Devolucion = "Devolucion",
	Fallecido = "Fallecido",
	Digitado = "Digitado",
	Programado = "Programado",
	Abierto = "Abierto",
	Aplicado = "Aplicado",
	Cargue_IPS = "Cargue_IPS",
}