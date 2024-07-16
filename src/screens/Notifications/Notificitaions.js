import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import NotificationCard from '../../components/NotificationCard';

const Notificaitons = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NotificationCard />
    </SafeAreaView>
  );
};

export default Notificaitons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
