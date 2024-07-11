import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import routes from '../../navigation/routes';

import BackIcon from '../../assets/svg/arrow-left.svg'

const BackButton = () => {
    const navigation = useNavigation()

  return (
    <TouchableOpacity 
      onPress={() => navigation.goBack()}
      style={styles.backIconContainer}>
      <BackIcon width={25} height={25} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
    backIconContainer: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
});
