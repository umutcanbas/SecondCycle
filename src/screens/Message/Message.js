import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import {useNavigation} from '@react-navigation/native';
import routes from '../../navigation/routes';


const Message = () => {
  const [currentUserId, setCurrentUserId] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');
  const [messages, setMessages] = useState([]);

  const navigation = useNavigation();

  /*   console.log(JSON.stringify(messages , null , 2)) */

  /*   messages.map(message => {
    console.log(message.product.name);
  }); */

  //current user
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

  // Fetch messages
  useEffect(() => {
    if (currentUserId) {
      const messagesRef = database().ref(`/messages/${currentUserId}`);

      const fetchMessages = messagesRef.on('value', snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const messageList = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setMessages(messageList);
        } else {
          setMessages([]);
        }
      });

      return () => messagesRef.off('value', fetchMessages);
    }
  }, [currentUserId]);

  const renderMessage = ({item}) => {
    /* console.log(JSON.stringify(item, null, 2)) */
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(routes.WITH_OUT_TAB,{
          screen : routes.CHATSCREEN
        })}
        activeOpacity={0.6}
        style={styles.messageContainer}>
        <Text style={styles.messageText}>{item.product.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Messages</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        ListEmptyComponent={() => (
          <View>
            <Text>No messages found</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'black',
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  messageText: {
    fontSize: 16,
  },
});
