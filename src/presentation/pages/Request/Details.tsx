import React, { useState, useEffect } from 'react';
import { RequestActions } from '@/services';
import { RequestHeader, RequestInfoCard, AffiliateInfoCard, IPSInfoCard, MedicineInfoCard, DeliveryInfoCard, ModalsContainer, ToolBarPQRS, SendInfoCard } from '@/presentation/components';
import { useLocationData, useModels, useRequestDetails, useRequestForm, useSessionManager } from '@/features/shared/hooks';
import { Col, Row } from '@/features/shared/components/Grid';

const Details: React.FC = () => {
  // User session data
  const { userData } = useSessionManager();

  // Get request ID and type from URL
  const requestId = location.pathname.split("/").pop();
  const isHistoric = location.pathname === "/request/historic";

  // Initialize service
  const requestActions = new RequestActions();

  // Fetch request details
  const { request, loading: requestLoading, isPQR } = useRequestDetails(requestId);

  // Fetch location data
  const { departments, cities, getCitiesByDepartment } = useLocationData();

  // Fetch models
  const { data: models } = useModels();

  // Form state management
  const {
    model,
    setModel,
    city,
    setCity,
    department,
    setDepartment,
    affiliateAddress,
    setAffiliateAddress,
    ipsAddress,
    setIpsAddress,
    name,
    setName,
    channel,
    setChannel
  } = useRequestForm(request);

  // Fetch cities when department changes
  useEffect(() => {
    if (department) {
      getCitiesByDepartment(department);
    }
  }, [department]);

  // Modal states
  const [sendType, setSendType] = useState(13);
  const [preApproveModal, setPreApproveModal] = useState(false);
  const [restoreModal, setRestoreModal] = useState(false);
  const [confirmTypingModal, setConfirmTypingModal] = useState(false);
  const [confirmShipmentModal, setConfirmShipmentModal] = useState(false);
  const [confirmDeliveryModal, setConfirmDeliveryModal] = useState(false);
  const [confirmDeliveryFailedModal, setConfirmDeliveryFailedModal] = useState(false);
  const [confirmApplyModal, setConfirmApplyModal] = useState(false);
  const [confirmNoApplyModal, setConfirmNoApplyModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  // Modal handlers
  const handlePreApproveClose = () => setPreApproveModal(false);
  const handleRestoreClose = () => setRestoreModal(false);
  const handleConfirmTypingClose = () => setConfirmTypingModal(false);
  const handleConfirmShipmentClose = () => setConfirmShipmentModal(false);
  const handleConfirmDeliveryClose = () => setConfirmDeliveryModal(false);
  const handleConfirmDeliveryFailedClose = () => setConfirmDeliveryFailedModal(false);
  const handleConfirmApplyClose = () => setConfirmApplyModal(false);
  const handleConfirmNoApplyClose = () => setConfirmNoApplyModal(false);
  const handleCancelClose = () => setCancelModal(false);

  // Action handlers
  const handleSchedule = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (request && userData?.id) {
      console.log(request.name)
      const success = await requestActions.markAsScheduled(
        request.id,
        userData.id.toString(),
        model,
        city,
        ipsAddress,
        request.ips_delegate,
        channel
      );

      if (success) {
        window.history.back();
      }
    }
  };

  const handleFailed = async () => {
    if (request && userData?.id && request.affiliateId) {
      const success = await requestActions.markAsFailed(request.affiliateId, userData.id.toString());
      if (success) {
        window.history.back();
      }
    }
  };

  const handleRedZone = async () => {
    if (request && userData?.id) {
      const success = await requestActions.markAsRedZone({
        id: request.id,
        userId: userData.id.toString(),
      });
      if (success) {
        window.history.back();
      }
    }
  };

  if (requestLoading || !request) {
    return <div>Loading...</div>;
  }

  const modalStates = {
    preApproveModal,
    restoreModal,
    confirmTypingModal,
    confirmShipmentModal,
    confirmDeliveryModal,
    confirmDeliveryFailedModal,
    confirmApplyModal,
    confirmNoApplyModal,
    cancelModal,
  };

  const modalHandlers = {
    handlePreApproveClose,
    handleRestoreClose,
    handleConfirmTypingClose,
    handleConfirmShipmentClose,
    handleConfirmDeliveryClose,
    handleConfirmDeliveryFailedClose,
    handleConfirmApplyClose,
    handleConfirmNoApplyClose,
    handleCancelClose,
  };

  return (
    <div>
      {request?.id && userData?.id && (
        <ModalsContainer
          request={request}
          username={userData.id}
          isPQR={isPQR}
          modalStates={modalStates}
          setModalStates={modalHandlers}
          sendType={sendType}
        />
      )}

      {request && (
        <>
          {request?.estado && (
            isPQR && (
              <ToolBarPQRS
                restore={setRestoreModal}
                redzone={handleRedZone}
                schedule={handleSchedule}
                status={request?.estado}
                manualShipping={setConfirmShipmentModal}
                normalShipment={setConfirmShipmentModal}
                confirmTyping={setConfirmTypingModal}
                confirmDelivery={setConfirmDeliveryModal}
                confirmDeliveryFailed={setConfirmDeliveryFailedModal}
                cancel={setCancelModal}
                sendType={setSendType}
                failed={handleFailed}
              />
            )
          )}

          <RequestHeader request={request} isPQR={isPQR} />

          <Row className="g-2">
            <Col md={6} lg={6} sm={12}>
              <RequestInfoCard request={request} />
            </Col>

            <Col md={6} lg={6} sm={12}>
              <AffiliateInfoCard
                request={request}
                affiliateAddress={affiliateAddress}
                setAffiliateAddress={setAffiliateAddress}
              />
            </Col>

            <Col md={6} lg={6} sm={12}>
              <IPSInfoCard
                request={request}
                name={name}
                setName={setName}
                department={department}
                setDepartment={setDepartment}
                city={city}
                setCity={setCity}
                ipsAddress={ipsAddress}
                setIpsAddress={setIpsAddress}
                departments={departments || []}
                cities={cities || []}
                isHistoric={isHistoric}
              />
            </Col>

            <Col md={6} lg={6} sm={12}>
              <MedicineInfoCard
                request={request}
                model={model}
                setModel={setModel}
                models={models || []}
                setChannel={setChannel}
                channel={channel}
              />
            </Col>

            <Col md={6} lg={6} sm={12}>
              <SendInfoCard request={request} />
            </Col>

            <Col md={6} lg={6} sm={12}>
              <DeliveryInfoCard request={request} />
            </Col>
          </Row>
        </>
      )
      }
    </div >
  );
};

export default Details;