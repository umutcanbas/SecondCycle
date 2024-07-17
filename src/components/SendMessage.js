import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

import Button from './Button/Button';

const SendMessage = () => {
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headertext}>
          Seller : <Text style={styles.sellerText}>ahmet</Text>{' '}
        </Text>
        <Text style={styles.headertext}>
          Buyer : <Text style={styles.buyerText}>ahmet</Text>{' '}
        </Text>
      </View>

      <TextInput
        placeholder="Send Message"
        value={message}
        onChangeText={setMessage}
        style={{...styles.input, height: 70}}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Add Product"
          onPress={() => console.log('message sended')}
        />
      </View>
    </View>
  );
};

export default SendMessage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    width: 323,
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  headertext: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
  },
  sellerText: {
    color: 'red',
  },
  buyerText: {
    color: 'blue',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  buttonContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
});
