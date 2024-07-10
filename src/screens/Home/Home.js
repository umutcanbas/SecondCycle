import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import Modal from '../../components/Modal/AddProductModal';
import Searchbar from '../../components/Searchbar';

import Button from '../../components/Button';
import Header from '../../components/Header';
import ProductCard from '../../components/Products/ProductsCard';

const Home = () => {
  const [inputModalVisible, setInputModalVisible] = useState(false);

  const handleInputToggle = () => {
    setInputModalVisible(!inputModalVisible);
  };

  return (
    <SafeAreaView style={styles.contaier}>
      <Header />

      <Searchbar />

      <ProductCard />

      <Button
        style={styles.modalButton}
        title="Add Product"
        onPress={handleInputToggle}
      />
      <Modal visible={inputModalVisible} onClose={handleInputToggle} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
    backgroundColor: 'white',

  },

  modalButton: {
    position: 'absolute',
    right: 15,
    bottom: 35,
  },
});
