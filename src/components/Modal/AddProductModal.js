import {View, Text, TextInput, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import AddProducts from '../Products/AddProducts';

const deviceSize = Dimensions.get('window');

const ContentInputModal = ({visible, onClose}) => {
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
          <AddProducts onClose={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: deviceSize.height / 2.1,
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

export default ContentInputModal;
