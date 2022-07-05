/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {EVENT_TYPES, useModal} from '../../hooks/useModal';
import Modal, {ModalProps} from 'react-native-modal';
import {DeviceEventEmitter, NativeEventEmitter, View} from 'react-native';

interface State {
  isVisible: boolean;
  component: React.ReactNode;
  props: Partial<ModalProps>;
}

const initialState: State = {
  isVisible: false,
  component: null,
  props: {},
};

const reducer = (state = initialState, action: React.ReducerAction) => {
  switch (action.type) {
    case EVENT_TYPES.OPEN:
      return {
        ...action.payload,
        isVisible: true,
      };
    case EVENT_TYPES.CLOSE:
      return {...state, isVisible: false};
    default:
      return state;
  }
};

export const ModalFactory = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onModalOpen = (component: React.FC<any>, props: ModalProps) => {
    dispatch({
      type: EVENT_TYPES.OPEN,
      payload: {
        component,
        props,
      },
    });
  };

  const onModalHide = () => {
    dispatch({
      type: EVENT_TYPES.CLOSE,
    });
  };

  React.useEffect(() => {
    const eventEmitter = new NativeEventEmitter();

    eventEmitter.addListener(EVENT_TYPES.OPEN, onModalOpen);

    eventEmitter.addListener(EVENT_TYPES.CLOSE, onModalHide);
  }, []);

  return (
    <Modal {...state.props} isVisible={state.isVisible}>
      {state.component ? state.component : <></>}
    </Modal>
  );
};

export default ModalFactory;
