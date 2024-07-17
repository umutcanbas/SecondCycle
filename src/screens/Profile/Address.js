import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import Input from '../../components/Input';
import Button from '../../components/Button/Button';
import BackButton from '../../components/Button/BackButton';
import { showMessage } from 'react-native-flash-message';

const Address = () => {
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUserId(user.uid);
      database()
        .ref(`/users/${user.uid}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.exists()) {
            setUser(snapshot.val());
          }
        });
    }
  }, []);

  const saveAddress = () => {
    if (userId) {
      database()
        .ref(`/users/${userId}/address`)
        .set(user)
        .then(() => {
          showMessage({
            message: 'Succesful',
            type: 'success',
          });
        })
        .catch(error => {
          showMessage({
            message: 'Fail',
            type: 'danger',
          });
        });
    } else {
      showMessage({
        message: 'Fail',
        type: 'danger',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.header}>
        <Text style={styles.headerText}>Change Address</Text>
      </View>

      <View style={styles.content}>
        <Input
          placeholder="Enter your new address"
          value={user}
          onChangeText={setUser}
        />
        <Button title="Save Address" onPress={saveAddress} />
      </View>
    </SafeAreaView>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    marginVertical: 150,
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'black',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
