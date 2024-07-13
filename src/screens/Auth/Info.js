import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import Button from '../../components/Button/Button';
import Input from '../../components/Input';

import {useNavigation} from '@react-navigation/native';
import routes from '../../navigation/routes';
import Header from '../../components/Header';

const Info = () => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUserId(user.uid);
      database()
        .ref(`/users/${user.uid}`)
        .once('value')
        .then(snapshot => {
          const userData = snapshot.val();
          if (userData) {
            if (userData.address && userData.username) {
              navigation.navigate(routes.TAB_NAVIGATOR);
            } else {
              if (userData.address) {
                setAddress(userData.address);
              }
              if (userData.username) {
                setUserName(userData.username);
              }
            }
          }
        });
    }
  }, [navigation]);

  const saveUserData = () => {
    if (userId) {
      const updates = {};

      if (address) {
        updates[`/users/${userId}/address`] = address;
      }

      if (userName) {
        updates[`/users/${userId}/username`] = userName;
      }

      database()
        .ref()
        .update(updates)
        .then(() => {
          navigation.navigate(routes.TAB_NAVIGATOR);
          alert('User data saved successfully.');
        })
        .catch(error => {
          alert('Failed to save user data.');
        });
    } else {
      alert('User not logged in.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>

      <Input
        style={styles.input}
        placeholder="Enter your user name"
        value={userName}
        onChangeText={setUserName}
      />
      <Input
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Save User Data" onPress={saveUserData} />
    </SafeAreaView>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 180,
  },
  header: {
    marginBottom: 5,
  },
});
