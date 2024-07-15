import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import Input from '../../components/Input';
import Button from '../../components/Button/Button';
import BackButton from '../../components/Button/BackButton';

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
          alert('Address saved successfully.');
        })
        .catch(error => {
          alert('Failed to save address.');
        });
    } else {
      alert('User not logged in.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input
        style={styles.input}
        placeholder="Enter your address"
        value={user}
        onChangeText={setUser}
      />
      <Button title="Save Address" onPress={saveAddress} />
    </SafeAreaView>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});
