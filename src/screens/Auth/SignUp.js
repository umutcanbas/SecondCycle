import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'; 

import routes from '../../navigation/routes';

import Input from '../../components/Input';
import Button from '../../components/Button/Button';
import BackButton from '../../components/Button/BackButton';

import {showMessage} from 'react-native-flash-message';

import auth from '@react-native-firebase/auth';

import authMessage from '../../utils/authErrorMessageParse';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onPressRegister = async () => {
    if (email == '') {
      showMessage({
        message: 'Email required',
        type: 'danger',
      });
      return;
    } else if (password !== rePassword) {
      showMessage({
        message: 'Passwords do not match',
        type: 'danger',
      });
      return;
    }
    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(email, password);
      showMessage({
        message: 'Successfully Created User',
        type: 'success',
      });
      await AsyncStorage.setItem('isLogged', 'true'); 

      navigation.navigate(routes.INFO);
    } catch (error) {
      showMessage({
        message: authMessage(error.code),
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={styles.title}>Create Account</Text>
      </View>

      <View style={styles.innerContainer}>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email Address"
        />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          isSecure
        />
        <Input
          value={rePassword}
          onChangeText={setRePassword}
          placeholder="Repassword"
          isSecure
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Register"
            disabled={password === '' || email === ''}
            onPress={onPressRegister}
            loading={loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    width: 450,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 50,
    marginTop: 110,
  },

  title: {
    color: 'black',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 30,
    marginLeft: 27,
    marginBottom: 30,
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: 23,
  },
  buttonContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
