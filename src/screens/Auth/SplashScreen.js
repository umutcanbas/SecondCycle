import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import routes from '../../navigation/routes';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';

const SplashScreen = ({navigation}) => {
  let isLogged = false;

  AsyncStorage.getItem('isLogged')
  .then(value => (isLogged = value))
  .catch(error => console.log(error));
  
  
  useEffect(() => {
      setTimeout(() => {
      if (isLogged == 'true' ) {
        navigation.navigate(routes.TAB_NAVIGATOR);
      } else {
        navigation.navigate(routes.LOGIN);
      }
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.content}>
     <Header/>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 46,
    color: 'black',
  },
});
