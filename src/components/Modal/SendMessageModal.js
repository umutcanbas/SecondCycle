import {View, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

import SendMessage from '../SendMessage';

const deviceSize = Dimensions.get('window');

const SendMessageModal = ({visible, onClose , seller}) => {


  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      swipeDirection="down"
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <View style={styles.line} />
        <View style={styles.input_container}>
          <SendMessage onClose={onClose} seller={seller}  />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 15,
      borderRadius: 10,
      height: deviceSize.height / 1.6,
    },
    line: {
      width: 80,
      height: 8,
      backgroundColor: '#e0e0e0',
      borderRadius: 10,
      alignSelf: 'center',
      marginBottom: 5,
    },
    input_container: {flex: 1},
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
  });
  
  export default SendMessageModal;
  