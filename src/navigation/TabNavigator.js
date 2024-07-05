import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import routes from './routes';
import Home from '../screens/Home/Home';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          borderColor: 'white',
        },
      })}>
      <Tab.Screen name={routes.HOME} component={Home} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
