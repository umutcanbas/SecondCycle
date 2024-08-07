import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import routes from './routes';

import Home from '../screens/Home/Home';
import Message from '../screens/Message/Message';
import Profile from '../screens/Profile/Profile';
import Notificaitons from '../screens/Notifications/Notificitaions';

import HomeIcon from '../assets/svg/home-line.svg';
import HomeFullIcon from '../assets/svg/home-fill.svg';
import ProfileIcon from '../assets/svg/user-line.svg';
import ProfileFullIcon from '../assets/svg/user-fill.svg';
import MessageIcon from '../assets/svg/chat-line.svg';
import MessageFullIcon from '../assets/svg/chat-fill.svg';

import NotiIcon from '../assets/svg/notification-line.svg';
import NotiFullIcon from '../assets/svg/notification-fill.svg';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const iconList = {
    home: HomeIcon,
    homeFull: HomeFullIcon,
    notificaiton: NotiIcon,
    notificaitonFull: NotiFullIcon,
    message: MessageIcon,
    messageFull: MessageFullIcon,
    profile: ProfileIcon,
    profileFull: ProfileFullIcon,
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          borderColor: 'white',
        },
        tabBarIcon: ({focused}) => {
          let Icon;

          if (route.name === routes.HOME) {
            Icon = focused ? iconList?.homeFull : iconList?.home;
          } else if (route.name === routes.NOTIFICATIONS) {
            Icon = focused ? iconList?.notificaitonFull : iconList?.notificaiton;
          } else if (route.name === routes.MESSAGE) {
            Icon = focused ? iconList?.messageFull : iconList?.message;
          } else if (route.name === routes.PROFILE) {
            Icon = focused ? iconList?.profileFull : iconList?.profile;
          }

          return <Icon width={24} height={24} />;
        },
      })}>
      <Tab.Screen name={routes.HOME} component={Home} />
      <Tab.Screen name={routes.NOTIFICATIONS} component={Notificaitons} />
      <Tab.Screen name={routes.MESSAGE} component={Message} />
      <Tab.Screen name={routes.PROFILE} component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
