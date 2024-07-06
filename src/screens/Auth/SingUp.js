import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import routes from '../../navigation/routes';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import {showMessage} from 'react-native-flash-message';

import auth from '@react-native-firebase/auth';

import BackIcon from '../../assets/svg/arrow-left.svg';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const onPressRegister = async () => {
    if (password !== rePassword) {
      showMessage({
        message: 'Passwords do not match',
        type: 'danger',
      });
      return;
    }
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      showMessage({
        message: 'Successfully Created User',
        type: 'success',
      });
      navigation.navigate(routes.LOGIN);
    } catch (error) {
      showMessage({
        message: 'Unexpected Error',
        description: error.message,
        type: 'danger',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(routes.LOGIN)}
          style={styles.backIconContainer}>
          <BackIcon width={25} height={25} />
        </TouchableOpacity>

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
    width:450,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:50,
    marginTop:110,

  },
  backIconContainer: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
