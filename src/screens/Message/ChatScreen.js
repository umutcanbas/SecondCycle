import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import {showMessage} from 'react-native-flash-message';

import Button from '../../components/Button/Button';

import BackButton from '../../components/Button/BackButton';

const ChatScreen = ({route}) => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const [message, setMessage] = useState('vvv');

  const product = route.params.product;

  //current user
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;
      if (user) {
        setCurrentUserId(user.uid);

        //user
        try {
          const usernameSnapshot = await database()
            .ref(`/users/${user.uid}`)
            .once('value');
          if (usernameSnapshot.exists()) {
            setCurrentUser(usernameSnapshot.val());
          } else {
            setCurrentUser('No username found');
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  //Message

  const SendMessage = () => {
    if (currentUserId && product && message) {
      const newProduct = {
        user: {currentUserId, currentUser},
        product,
        message,
      };

      database()
        .ref('/messages')
        .push(newProduct)
        .then(() => {
          showMessage({
            message: 'send',
            type: 'success',
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={styles.headerText}>Send Message</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>{product.name}</Text>
        <Text style={styles.detailText}>{product.price}$</Text>
      </View>

      <Button title={'ahahaha'} onPress={() => SendMessage()} />

      {/* mesajlar */}
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 35,
    marginRight: 40,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailText: {
    fontWeight: '600',
    fontSize: 22,
  },
});
