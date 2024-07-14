import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import Button from '../../components/Button/Button';

import routes from '../../navigation/routes';

const Profile = ({navigation}) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [userProductCount, setUserProductCount] = useState(0);

  const logOut = async () => {
    try {
      await auth().signOut();
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
    const fetchUserDataAndProductCount = async () => {
      const user = auth().currentUser;
      if (user) {
        setUserId(user.uid);

        try {
          // user
          const usernameSnapshot = await database()
            .ref(`/users/${user.uid}/username`)
            .once('value');
          if (usernameSnapshot.exists()) {
            setUserName(usernameSnapshot.val());
          } else {
            setUserName('No username found');
          }
          //product
          const productRef = database()
            .ref('/products')
            .orderByChild('userId')
            .equalTo(user.uid);
          productRef.on('value', snapshot => {
            if (snapshot.exists()) {
              setUserProductCount(snapshot.numChildren());
            } else {
              setUserProductCount(0);
            }
          });

          return () => {
            productRef.off();
          };
        } catch (error) {
          console.error('Failed to fetch user data or product count:', error);
        }
      }
    };

    fetchUserDataAndProductCount();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Button title="Address" onPress={goAddress} />

      <Text>Username: {userName}</Text>
      <Text>Products: {userProductCount}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Log Out" onPress={logOut} textColor="red" />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 125,
  },
});
