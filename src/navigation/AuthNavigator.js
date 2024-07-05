import { View, Text } from 'react-native';
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Auth/Login';
import SingUp from '../screens/Auth/SingUp';

import routes from './routes';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.LOGIN} component={Login} />
      <Stack.Screen name={routes.SINGUP} component={SingUp} />
   
    </Stack.Navigator>
  );
};

export default AuthNavigator;