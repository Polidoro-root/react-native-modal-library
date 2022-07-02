/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {ModalFactory} from './components/ModalFactory/ModalFactory';
import useModal from './hooks/useModal';

const App = () => {
  const modal = useModal();
  const isDarkMode = useColorScheme() === 'dark';

  const closeModal = () => {
    modal.close();
  };

  const openModal = () => {
    modal.open(
      <View style={{width: 200, height: 200, backgroundColor: 'blue'}}>
        <TouchableOpacity onPress={closeModal}>
          <Text>Close Modal</Text>
        </TouchableOpacity>
      </View>,
      {
        animationIn: 'slideInDown',
        animationOut: 'slideInUp',
        onModalHide: () => {
          modal.open(
            <View style={{width: 100, height: 100, backgroundColor: 'yellow'}}>
              <TouchableOpacity onPress={closeModal}>
                <Text>Close Modal</Text>
              </TouchableOpacity>
            </View>,
            {
              animationIn: 'slideInLeft',
              animationOut: 'slideInRight',
              onModalHide: () => {
                modal.close();
              },
              onModalShow: () => {
                console.log('2_ON_MODAL_SHOW');
              },
            },
          );
        },
        onModalShow: () => {
          console.log('1_ON_MODAL_SHOW');
        },
      },
    );
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{flex: 1, padding: 64}}>
        <TouchableOpacity
          onPress={openModal}
          style={{backgroundColor: 'red'}}
          activeOpacity={0.5}>
          <Text>Open Modal</Text>
        </TouchableOpacity>
      </View>
      <ModalFactory />
    </>
  );
};

export default App;
