import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import Button from '../../components/Button/Button';

import routes from '../../navigation/routes';

import Products from '../../components/Products/Products';

import parseContentData from '../../utils/parseContentData';

const Profile = ({navigation}) => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState('');
  const [userProducts, setUserProducts] = useState({});

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
    const fetchUserDataAndProduct = async () => {
      const user = auth().currentUser;
      if (user) {
        setUserId(user.uid);

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

          // product
          const snapshot = await database()
            .ref(`/products/${user.uid}`)
            .once('value');
          const obj = snapshot.val();
          if (obj === null) return setUserProducts([]);
          const products = Object.keys(obj).forEach(key => {
            return {
              ...obj[key],
              id: key,
            };
          });
          setUserProducts(products);
        } catch (error) {
          console.error('Failed to fetch user data or products:', error);
        }
      }
    };

    fetchUserDataAndProduct();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.ımageContainer}>
          {/* ımage */}
          <Text>IMAGE</Text>
        </View>

        <Text style={styles.userName}>{user.name}</Text>
      </View>

      <Products userProducts={userProducts}>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Change Address"
            onPress={goAddress}
            buttonStyle={styles.button}
          />

          <Button
            title="Log Out"
            onPress={logOut}
            buttonTextColor="red"
            buttonStyle={styles.button}
          />
        </View>
      </Products>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ımageContainer: {
    backgroundColor: 'blue',
    width: 300,
    height: 200,
    margin: 10,
  },
  ımage: {},
  userName: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 22,
    margin: 5,
    textTransform: 'uppercase',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 5,
  },
});
