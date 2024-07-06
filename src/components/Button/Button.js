import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import React from 'react';

const Button = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title} </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {},
  button: {
    width: 141,
    height: 40,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});
