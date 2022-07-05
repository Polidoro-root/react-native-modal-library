import React from 'react';
import {NativeEventEmitter} from 'react-native';
import {ModalProps as RNModalProps} from 'react-native-modal';

export const EVENT_TYPES = {
  OPEN: 'modal/open',
  CLOSE: 'modal/close',
};

export type ModalProps = Omit<RNModalProps, 'isVisible'>;

export const useModal = () => {
  const open = (Component: React.FC<any>, modalProps?: ModalProps) => {
    const eventEmitter = new NativeEventEmitter();

    eventEmitter.emit(EVENT_TYPES.OPEN, Component, modalProps);
  };

  const close = () => {
    const eventEmitter = new NativeEventEmitter();
    eventEmitter.emit(EVENT_TYPES.CLOSE);
  };

  return {open, close};
};

export default useModal;
