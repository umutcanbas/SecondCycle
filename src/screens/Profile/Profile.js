import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import Button from '../../components/Button/Button';

import routes from '../../navigation/routes';

const Profile = ({navigation}) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('isLogged');
      console.log('User logged out');
      navigation.navigate(routes.LOGIN);
    } catch (error) {
      console.error('Error removing isLogged:', error);
    }
  };

  const goAddress = () => {
    navigation.navigate(routes.WITH_OUT_TAB, {
      screen: routes.ADDRESS,
    });
  };

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUserId(user.uid);
      database()
        .ref(`/users/${user.uid}/username`)
        .once('value')
        .then(snapshot => {
          if (snapshot.exists()) {
            setUserName(snapshot.val());
          } else {
            setUserName('No username found');
          }
        })
        .catch(error => {
          console.error('Failed to fetch username:', error);
        });
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Button title="Address" onPress={() => goAddress()} />


      <Text>Username: {userName}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Log Out" onPress={() => logOut()} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 125,
  },
});
