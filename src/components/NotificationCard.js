import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import NotificationIcon from '../assets/svg/notification-line.svg'

const NotificationCard = () => {
    const [isRead, setIsRead] = useState(false);
  return (
    <>
    
    <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Notificaitons</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Profile Update Successful!</Text>
        <NotificationIcon width={20} height={20} />
        <Text style={isRead ? styles.noti : styles.notiRead}>•</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Product Approved!</Text>
        <NotificationIcon width={20} height={20} />
        <Text style={isRead ? styles.noti : styles.notiRead}>•</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Sale Notification!</Text>
        <NotificationIcon width={20} height={20} />
        <Text style={isRead ? styles.notiRead : styles.noti}>•</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Item Favorited!</Text>
        <NotificationIcon width={20} height={20} />
        <Text style={isRead ? styles.notiRead : styles.noti}>•</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Profile View Alert!</Text>
        <NotificationIcon width={20} height={20} />
        <Text style={isRead ? styles.notiRead : styles.noti}>•</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Shipping Reminder!</Text>
        <NotificationIcon width={20} height={20} />
        <Text style={isRead ? styles.noti : styles.notiRead}>•</Text>
      </View>
      </>
  )
}

export default NotificationCard

const styles = StyleSheet.create({
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
      content: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 'auto',
        height: 50,
        margin: 5,
        padding: 10,
        borderRadius: 15,
        borderWidth: 0.2,
        borderColor: 'black',
      },
      contentText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        marginRight: 5,
        marginLeft: 5,
        width: 330,
      },
      noti: {
        position: 'absolute',
        right: 6,
        top: -8,
        color: 'red',
        fontWeight: 'bold',
        fontSize: 40,
      },
      notiRead: {
        position: 'absolute',
        right: 6,
        top: -8,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 40,
      },
})