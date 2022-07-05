/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ModalFactory} from './components/ModalFactory/ModalFactory';
import useModal from './hooks/useModal';

const Test = ({state, setState, close}: any) => {
  return (
    <View style={{flex: 1, backgroundColor: 'blue'}}>
      <TouchableOpacity onPress={close}>
        <Text>Close Modal</Text>
      </TouchableOpacity>

      <TextInput onChangeText={setState} />
      <Text>{state}</Text>
    </View>
  );
};

const App = () => {
  const modal = useModal();
  const [state, setState] = React.useState('');

  const openModal = () => {
    modal.open(<Test state={state} setState={setState} close={modal.close} />);
  };

  React.useEffect(() => {
    console.log({state});
  }, [state]);

  return (
    <>
      <View style={{flex: 1, padding: 64}}>
        <TouchableOpacity
          onPress={openModal}
          style={{backgroundColor: 'red'}}
          activeOpacity={0.5}>
          <Text>Open Modal</Text>
        </TouchableOpacity>
        <TextInput value={state} onChangeText={setState} />
        <Text>{state}</Text>
      </View>
      <ModalFactory />
    </>
  );
};

export default App;
