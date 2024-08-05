import {SafeAreaView, StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import {showMessage} from 'react-native-flash-message';

import Button from '../../components/Button/Button';

import BackButton from '../../components/Button/BackButton';
import Input from '../../components/Input';

const ChatScreen = ({route}) => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserName, setCurrentUserName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const product = route.params.data;

  const messagePath = `/${currentUserId}-sep-${product.userId}`;

  // Current user data fetch
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;
      if (user) {
        setCurrentUserId(user.uid);

        //current user name
        try {
          const usernameSnapshot = await database()
            .ref(`/users/${user.uid}`)
            .once('value');
          if (usernameSnapshot.exists()) {
            setCurrentUserName(usernameSnapshot.val());
          } else {
            setCurrentUserName('No username found');
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  // Fetch existing messagesList
  useEffect(() => {
    if (currentUserId) {
      const fetchMessages = () => {
        database()
          .ref(`/messages/`)
          .on('value', snapshot => {
            const messages = snapshot.val();
            if (messages === null) return setMessages([]);

            const userMessagesKey = Object.keys(messages).filter(item =>
              item.includes(currentUserId),
            );
            const userMessages = messages[userMessagesKey];
            setMessages(userMessages);
          });
      };

      fetchMessages();

      return () => {
        database()
          .ref(`/messages/${currentUserId}`)
          .off('value', fetchMessages);
      };
    }
  }, [currentUserId]);

  // Send Message
  const sendMessage = () => {
    if (message) {
      const newMessage = {
        message,
      };

      database()
        .ref('/messages')
        .child(messagePath)
        .push(newMessage)
        .then(() => {
          showMessage({
            message: 'Message sent',
            type: 'success',
          });
          setMessage('');
        })
        .catch(error => {
          console.log('Failed to send message:', error);
        });
    } else {
      console.log('Message sending error: Missing data');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={styles.headerText}>Send Message</Text>
      </View>

      <View style={styles.detailContainer}></View>

      <FlatList
        data={messages}
        renderItem={({item}) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.message}</Text>
            {/*  <Text style={styles.messageUser}>{item.currentUser.username}</Text> */}
          </View>
        )}
        keyExtractor={item => item.id}
      />

      <Input
        placeholder="Send Message"
        value={message}
        onChangeText={setMessage}
      />

      <Button title={'Send Message'} onPress={sendMessage} />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
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
  messageContainer: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  messageText: {
    fontSize: 16,
  },
  messageUser: {
    fontSize: 12,
    color: 'gray',
  },
});
