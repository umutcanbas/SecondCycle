import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState, useEffect} from 'react';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import Button from './Button/Button';
import Input from './Input';

const SendMessage = ({seller}) => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchUserDataAndProduct = async () => {
      const user = auth().currentUser;
      if (user) {
        setUser(user);

        try {
          // user
          const usernameSnapshot = await database()
            .ref(`/users/${user.uid}`)
            .once('value');
          if (usernameSnapshot.exists()) {
            setUser(usernameSnapshot.val());
          } else {
            setUser('No username found');
          }
        } catch (error) {
          console.error('Failed to fetch user data or product count:', error);
        }
      }
    };

    fetchUserDataAndProduct();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headertext}>
          Seller : <Text style={styles.sellerText}>{seller.username}</Text>{' '}
        </Text>
        <Text style={styles.headertext}>
          Buyer : <Text style={styles.buyerText}>{user.username}</Text>{' '}
        </Text>
      </View>

      <Input
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
