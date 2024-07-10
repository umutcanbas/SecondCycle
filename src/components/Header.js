import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Logo from '../assets/svg/logo.svg';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headertext}>Second Cycle</Text>
      <Logo height={40} width={40} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    marginVertical: 20,
  },
  headertext: {
    fontWeight: 'bold',
    fontSize: 45,
    color: 'black',
  },
});
