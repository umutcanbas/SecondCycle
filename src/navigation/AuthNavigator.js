import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/Auth/SplashScreen';
import Login from '../screens/Auth/Login';
import SingUp from '../screens/Auth/SignUp';
import Info from '../screens/Auth/Info';

import routes from './routes';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.SPLASHSCREEN} component={SplashScreen} />
      <Stack.Screen name={routes.LOGIN} component={Login} />
      <Stack.Screen name={routes.SINGUP} component={SingUp} />
      <Stack.Screen name={routes.INFO} component={Info} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
