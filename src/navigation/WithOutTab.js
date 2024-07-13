import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';

import ProductDetail from '../screens/Home/ProductDetail';
import Address from '../screens/Profile/Address';

const Stack = createNativeStackNavigator();

const WithOutTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.PRODUCT_DETAIL} component={ProductDetail} />
      <Stack.Screen name={routes.ADDRESS} component={Address} />
    </Stack.Navigator>
  );
};

export default WithOutTab;
