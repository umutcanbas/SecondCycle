import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {showMessage} from 'react-native-flash-message';

import auth from '@react-native-firebase/auth';

import authMessage from '../../utils/authErrorMessageParse';

import routes from '../../navigation/routes';

import Input from '../../components/Input';

import Button from '../../components/Button/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const goSignUp = () => {
    navigation.navigate(routes.SINGUP);
  };

  const signIn = async () => {
    setLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        showMessage({
          message: 'Successfully Logged In',
          type: 'success',
        });
        AsyncStorage.setItem('isLogged', 'true');

        navigation.navigate(routes.INFO);
      })
      .catch(error => {
        showMessage({
          message: authMessage(error.code),
          type: 'danger',
        });
      })
      .finally(_ => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

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
        <Button title="Sign In" onPress={signIn} loading={loading} />
        <Button title="Create Account" onPress={goSignUp} />
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
    marginBottom:290
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
