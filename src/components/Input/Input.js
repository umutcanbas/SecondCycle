import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';

const Input = ({
  value,
  onChangeText,
  placeholder,
  isSecure,
  placeholderTextColor,
  maxLength,
  keyboardType,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={isSecure}
        autoCapitalize="none"
        maxLength={maxLength}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 14,
    marginBottom: 17,
    borderRadius: 4,
    borderWidth: 0.2,
    borderColor: 'grey',
    height: 40,
  },
  input: {
    width: '95%',
    marginLeft: 10,
  },
});
