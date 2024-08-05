import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import Button from '../../components/Button/Button';
import Input from '../../components/Input';

import {useNavigation} from '@react-navigation/native';
import routes from '../../navigation/routes';
import Header from '../../components/Header';
import {showMessage} from 'react-native-flash-message';

const Info = () => {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUserId(user.uid);

      /* navigation.navigate(routes.TAB_NAVIGATOR); */
    }
  }, [navigation]);

  const saveUserData = () => {
    if (userId) {
      const user = {
        name,
        address,
        phone,
      };
      database()
        .ref(`/users`)
        .child(userId)
        .set(user)
        .then(() => {
          navigation.navigate(routes.TAB_NAVIGATOR);
          showMessage({
            message: 'Added',
            type: 'success',
          });
        })
        .catch(error => {
          showMessage({
            message: 'Fail',
            type: 'danger',
          });
        });
    } else {
      showMessage({
        message: 'Fail',
        type: 'danger',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>

      <Input
        style={styles.input}
        placeholder="Enter your user name"
        value={name}
        onChangeText={setName}
      />
      <Input
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />
      <Input
        style={styles.input}
        placeholder="Enter your Phone Number"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Save User Data" onPress={saveUserData} />
    </SafeAreaView>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 180,
  },
  header: {
    marginBottom: 5,
  },
});
