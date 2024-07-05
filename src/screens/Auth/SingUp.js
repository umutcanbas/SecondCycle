import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';

import routes from '../../navigation/routes';
import Input from '../../components/Input/Input';
import { showMessage } from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressRegister = async () => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      
      // Başarılı kayıt durumunda
      showMessage({
        message: 'Successfully Created User',
        type: 'success',
      });
      navigation.navigate(routes.LOGIN);
    } catch (error) {
      // Hata durumunda
      showMessage({
        message: 'Unexpected Error',
        description: error.message,
        type: 'danger',
      });
      console.error('onPressRegister Error: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate(routes.LOGIN)}
        style={styles.backIconContainer}
      />
      <Text style={styles.title}>Create Account</Text>

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

        <Button
          title="Register"
          disabled={password === '' || email === ''}
          onPress={onPressRegister}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backIconContainer: {
    backgroundColor: 'grey',
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 63,
    marginLeft: 27,
  },
  title: {
    color: 'black',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 20,
    marginLeft: 27,
    marginBottom: 32,
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: 23,
  },
});
