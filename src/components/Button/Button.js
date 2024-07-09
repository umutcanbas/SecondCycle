import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import React from 'react';

const Button = ({title, onPress, style, loading}) => {
  return (
    <TouchableOpacity
      style={{...styles.button, ...style}}
      onPress={onPress}
      disabled={loading}>
      <Text style={styles.text}>{title} </Text>
      {loading && (
        <ActivityIndicator
          color="red"
          style={{marginLeft: 5}}
          loading={loading}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: 141,
    height: 40,
    flexDirection: 'row',
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
