import Swal from 'sweetalert2';
import { RequestApiRepository } from '@/features/shared/repositories';
import { httpClient } from '@/http';
import { DateTime } from 'luxon';

export class RequestActions {
  private repository: RequestApiRepository;

  constructor() {
    this.repository = new RequestApiRepository(httpClient);
  }

  async markAsScheduled(
    requestId: string,
    userId: string,
    model: number,
    city: number,
    ipsAddress: string,
    name: string,
    channel: string
  ) {
    if (model === 0) {
      await Swal.fire({
        title: "Alerta",
        icon: "warning",
        text: "Debes seleccionar un modelo para continuar",
      });
      return false;
    }

    if (!userId || !requestId) {
      return false;
    }

    await this.repository.markAsScheduled({
      id: requestId,
      userId,
      address: ipsAddress,
      modelId: model,
      name: name,
      self_management_date: DateTime.now().toFormat('YYYY-MM-DD'),
      cityId: String(city),
      channel: channel.toUpperCase(),
    });

    return true;
  }

  async markAsDigited(
    requestId: string,
    userId: string,
    digited: string,
    auth_number: string,
    formula: string,
    observations?: string
  ) {
    if (!userId || !requestId || !digited || !auth_number || !formula) {
      return false;
    }
    await this.repository.markAsDigited({
      id: requestId,
      userId,
      digited: DateTime.fromISO(digited).toFormat('YYYY-MM-DD'),
      auth_number: auth_number,
      formula: formula,
      observations
    });

    return true;
  }

  async markAsSended(
    requestId: string,
    userId: string,
    sended: string,
    guide_number: string,
    conveyorId: number,
    manual: boolean,
    observations?: string
  ) {
    if (!userId || !requestId || !sended || !guide_number || !conveyorId) {
      return false;
    }

    await this.repository.markAsSended({
      id: requestId,
      userId,
      sended: DateTime.fromISO(sended).toFormat('YYYY-MM-DD'),
      guide_number: guide_number,
      conveyorId: conveyorId,
      manual: manual,
      observations
    });

    return true;
  }

  async markAsDelivered(params: {
    id: string;
    userId: string;
    delivered: string;
  }): Promise<void> {
    await this.repository.markAsDelivered({
      id: params.id,
      userId: params.userId,
      delivered: DateTime.fromISO(params.delivered).toFormat('YYYY-MM-DD')
    });
  }

  async markAsFailed(affiliateId: number, userId: string) {
    const result = await Swal.fire({
      title: "Confirmación",
      icon: "warning",
      text: "¿Confirmas que el afiliado en cuestión ha fallecido?, Todas las solicitudes en curso serán canceladas",
    });

    if (!result.isConfirmed) return false;

    if (!affiliateId || !userId) {
      await Swal.fire({
        title: "Alerta",
        icon: "warning",
        text: "No se pudo realizar la acción",
      });
      return false;
    }

    await this.repository.markAsFailed({
      affiliateId: affiliateId,
      userId,
    });

    await Swal.fire({
      title: "Alerta",
      icon: "success",
      text: 'Se ha realizado la acción con éxito',
    });

    return true;
  }

  async markAsNulled(params: {
    id: string;
    userId: string;
    observations?: string
  }): Promise<boolean> {
    try {
      await this.repository.markAsNulled(params);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async markAsRestored(params: {
    id: string;
    userId: string;
    observations?: string
  }): Promise<boolean> {
    try {
      await this.repository.markAsRestored(params);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async markAsDeliveredFailed(params: {
    id: string;
    userId: string;
    delivered: string;
    observations?: string
  }): Promise<boolean> {
    try {
      await this.repository.markAsDeliveredFailed(params);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async markAsRedZone(params: {
    id: string;
    userId: string;
  }): Promise<boolean> {
    const result = await Swal.fire({
      title: "Confirmación",
      icon: "warning",
      text: "¿Confirmas que el afiliado en cuestión se encuentra en zona roja?",
    });

    if (!result.isConfirmed) return false;

    if (!params.id || !params.userId) {
      await Swal.fire({
        title: "Alerta",
        icon: "warning",
        text: "No se pudo realizar la acción",
      });
      return false;
    }

    await this.repository.markAsRedZone(params);

    await Swal.fire({
      title: "Alerta",
      icon: "success",
      text: 'Se ha realizado la acción con éxito',
    });

    return true;
  }

  extraerMarcaComercial(descripcion: string) {
    if (typeof descripcion !== 'string' || !descripcion) {
      return "No identificada";
    }

    const patron = /X\s+\d+\s+(\w+)/i;
    const match = descripcion.match(patron);

    if (match && match[1]) {
      let marca = match[1].toUpperCase();

      if (match[2] && ["JALEA", "POMADA"].includes(match[2].toUpperCase())) {
        marca += " " + match[2].toUpperCase();
      }

      return marca;
    }

    return "No identificada";
  }
}