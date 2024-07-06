import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {showMessage} from 'react-native-flash-message';

import auth from '@react-native-firebase/auth';

/* import {useNavigation} from '@react-navigation/native'; */

import routes from '../../navigation/routes';

import Input from '../../components/Input/Input';

import Button from '../../components/Button/Button';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /*  const navigation = useNavigation(); */

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
        navigation.navigate(routes.TAB_NAVIGATOR);
      })
      .catch(error => {
        showMessage({
          message: 'Login Failed',
          description: error.message,
          type: 'danger',
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Second Cycle</Text>

      <Text style={styles.title}>Login </Text>

      <View style={styles.innerContainer}>
        <Input value={email} onChangeText={setEmail} placeholder="Email" />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          isSecure
          eye={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sign In" onPress={() => signIn()} />
        <Button title="Create Account" onPress={() => signUp()} />
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
    fontWeight: '650',
    fontSize: 50,
    color: 'black',
    marginBottom: 110,
  },
  title: {
    color: 'black',
    fontSize: 32,
    fontWeight: '700',
    marginLeft: 27,
    marginBottom: 32,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  innerContainer: {
    marginHorizontal: 24,
  },
});

export default Login;
