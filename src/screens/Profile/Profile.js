import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../../components/Button';

import routes from '../../navigation/routes';

const Profile = ({navigation}) => {
  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('isLogged' );
      console.log('User logged out');
      navigation.navigate(routes.LOGIN);
    } catch (error) {
      console.error('Error removing isLogged:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <View style={styles.buttonContainer}>
        <Button title="Log Out" onPress={() => logOut()} style={styles.button} />
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
  button:{
    backgroundColor:'red'
  }
});
