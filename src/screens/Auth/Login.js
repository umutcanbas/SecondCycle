import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {showMessage} from 'react-native-flash-message';

import auth from '@react-native-firebase/auth';

import {useNavigation} from '@react-navigation/native';

import routes from '../../navigation/routes';

import Input from '../../components/Input/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const signUp = () => {
    navigation.navigate(routes.SINGUP);
  };

  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        showMessage({
          message: 'Successfully Logged In',
          type: 'success',
        });
        navigation.navigate(routes.TAB_NAVIGATOR)
      })
      .catch(error => {
        showMessage({
          message: 'Login Failed',
          description: error.message,
          type: 'danger',
        });
      });
      navigation.navigate(routes.HOME)
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Login </Text>

      <Input value={email} onChangeText={setEmail} placeholder="Email" />

      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        isSecure
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign In" onPress={signIn} />
        <Button title="Create Account" onPress={signUp} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default Login;
