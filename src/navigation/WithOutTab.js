import {View, Text} from 'react-native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';

import ProductDetail from '../screens/Home/ProductDetail';

const Stack = createNativeStackNavigator();

const WithOutTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.PRODUCT_DETAIL} component={ProductDetail} />
    </Stack.Navigator>
  );
};

export default WithOutTab;
