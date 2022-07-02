/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {EVENT_TYPES, useModal} from '../../hooks/useModal';
import Modal, {ModalProps} from 'react-native-modal';
import {DeviceEventEmitter} from 'react-native';

export const ModalFactory = () => {
  const modal = useModal();
  const [modalComponent, setModalComponent] = React.useState<{
    component: React.FC<any> | null;
    props: ModalProps | {};
  }>({
    component: null,
    props: {},
  });

  const onModalOpen = (component: React.FC<any>, props: ModalProps) => {
    console.log('ON_MODAL_OPEN');
    setModalComponent({
      component,
      props,
    });
  };

  const onModalClose = () => {
    modalComponent.props?.onModalHide?.();
  };

  React.useEffect(() => {
    DeviceEventEmitter.addListener(EVENT_TYPES.OPEN, onModalOpen);
  }, []);

  React.useEffect(() => {
    DeviceEventEmitter.addListener(EVENT_TYPES.CLOSE, onModalClose);
  }, [modalComponent]);

  return (
    <Modal {...modalComponent.props} visible={!!modalComponent.component}>
      {modalComponent.component ? modalComponent.component : <></>}
    </Modal>
  );
};

export default ModalFactory;
