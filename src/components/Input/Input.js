import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import Eye from '../../assets/svg/eye-on.svg';
import EyeClose from '../../assets/svg/eye-off.svg';

const Input = ({value, onChangeText, placeholder, isSecure}) => {
  const [secureText, setSecureText] = useState(isSecure);

  const toggleSecureText = () => {
    setSecureText(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureText}
        autoCapitalize="none"
      />
      {isSecure && (
        <TouchableOpacity onPress={toggleSecureText} style={styles.icon}>
          {secureText ? (
            <EyeClose width={24} height={24} />
          ) : (
            <Eye width={24} height={24} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 17,
    borderRadius: 4,
    borderWidth: 0.2,
    borderColor: 'grey',
    height: 40,
  },
  input: {
    width: 300,
    marginLeft: 10,
  },
  icon: {
    padding: 5,
  },
});
