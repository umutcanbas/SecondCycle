import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProductCard from '../../components/Products/Products';

const Notificaitons = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Notificaitons</Text>
    </SafeAreaView>
  );
};

export default Notificaitons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
