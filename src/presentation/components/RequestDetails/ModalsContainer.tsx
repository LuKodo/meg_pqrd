import React from 'react';
import { iRequestView } from '@/entities';
import { RestoreModal } from '../Request/RestoreModal';
import { ConfirmTyping } from '../Request/ConfirmTyping';
import { ConfirmShipment } from '../Request/ConfirmShipment';
import { ConfirmDelivery } from '../Request/ConfirmDelivery';
import { ConfirmDeliveryFailed } from '../Request/ConfirmDeliveryFailed';
import { ConfirmApplication } from '../Request/ConfirmApplication';
import { CancelRequestModal } from '../Request/CancelRequestModal';
import { PreApprove } from '../Request/PreAprove';

interface ModalsContainerProps {
  request: iRequestView | null;
  username: number;
  isPQR: boolean;
  modalStates: {
    preApproveModal: boolean;
    restoreModal: boolean;
    confirmTypingModal: boolean;
    confirmShipmentModal: boolean;
    confirmDeliveryModal: boolean;
    confirmDeliveryFailedModal: boolean;
    confirmApplyModal: boolean;
    confirmNoApplyModal: boolean;
    cancelModal: boolean;
  };
  setModalStates: {
    handlePreApproveClose: () => void;
    handleRestoreClose: () => void;
    handleConfirmTypingClose: () => void;
    handleConfirmShipmentClose: () => void;
    handleConfirmDeliveryClose: () => void;
    handleConfirmDeliveryFailedClose: () => void;
    handleConfirmApplyClose: () => void;
    handleConfirmNoApplyClose: () => void;
    handleCancelClose: () => void;
  };
  sendType: number;
}

export const ModalsContainer: React.FC<ModalsContainerProps> = ({
  request,
  username,
  isPQR,
  modalStates,
  setModalStates,
  sendType
}) => {
  return (
    <>
      <RestoreModal
        show={modalStates.restoreModal}
        handleClose={setModalStates.handleRestoreClose}
        request={request}
        username={username}
      />

      <ConfirmTyping
        show={modalStates.confirmTypingModal}
        handleClose={setModalStates.handleConfirmTypingClose}
        request={request as iRequestView}
      />

      <ConfirmShipment
        status={sendType}
        show={modalStates.confirmShipmentModal}
        handleClose={setModalStates.handleConfirmShipmentClose}
        request={request as iRequestView}
      />

      <ConfirmDelivery
        show={modalStates.confirmDeliveryModal}
        handleClose={setModalStates.handleConfirmDeliveryClose}
        request={request as iRequestView}
        isPQRS={isPQR}
      />

      <ConfirmDeliveryFailed
        show={modalStates.confirmDeliveryFailedModal}
        handleClose={setModalStates.handleConfirmDeliveryFailedClose}
        request={request as iRequestView}
        isPQRS={isPQR}
      />

      {!isPQR && (
        <>
          <PreApprove
            show={modalStates.preApproveModal}
            handleClose={setModalStates.handlePreApproveClose}
            request={request as iRequestView}
          />

          <ConfirmApplication
            show={modalStates.confirmApplyModal}
            handleClose={setModalStates.handleConfirmApplyClose}
            request={request as iRequestView}
          />
        </>
      )}

      <CancelRequestModal
        show={modalStates.cancelModal}
        handleClose={setModalStates.handleCancelClose}
        request={request as iRequestView}
        username={username}
        isPQRS={isPQR}
      />
    </>
  );
};