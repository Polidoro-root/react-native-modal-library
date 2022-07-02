import React from 'react';
import {DeviceEventEmitter} from 'react-native';
import {ModalProps} from 'react-native-modal';

export const EVENT_TYPES = {
  OPEN: 'modal/open',
  CLOSE: 'modal/close',
};

export const useModal = () => {
  const open = (
    Component: React.FC<any>,
    modalProps?: Omit<ModalProps, 'visible'>,
  ) => {
    DeviceEventEmitter.emit(EVENT_TYPES.OPEN, Component, modalProps);
  };

  const close = () => {
    DeviceEventEmitter.emit(EVENT_TYPES.CLOSE);
  };

  return {open, close};
};

export default useModal;
