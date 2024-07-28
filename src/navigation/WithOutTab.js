import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';

import ProductDetail from '../screens/Home/ProductDetail';
import Address from '../screens/Profile/Address';
import ChatScreen from '../screens/Message/ChatScreen'

const Stack = createNativeStackNavigator();

const WithOutTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.PRODUCT_DETAIL} component={ProductDetail} />
      <Stack.Screen name={routes.ADDRESS} component={Address} />
      <Stack.Screen name={routes.CHATSCREEN} component={ChatScreen} />

    </Stack.Navigator>
  );
};

export default WithOutTab;
