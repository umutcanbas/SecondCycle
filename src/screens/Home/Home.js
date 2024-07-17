import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import AddProcutModal from '../../components/Modal/AddProductModal';
import Searchbar from '../../components/Searchbar';

import database from '@react-native-firebase/database';

import Button from '../../components/Button/Button';
import Header from '../../components/Header';
import Products from '../../components/Products/Products';

const Home = () => {
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [ search  ,  setSearch] = useState('')
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputToggle = () => {
    setInputModalVisible(!inputModalVisible);
  };


  useEffect(() => {
    const onValueChange = database()
      .ref('/products')
      .on('value', snapshot => {
        const productsList = [];
        snapshot.forEach(childSnapshot => {
          productsList.push({
            key: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        setProducts(productsList);
        setLoading(false);
      });

    return () => database().ref('/products').off('value', onValueChange);
  }, []);

  return (
    <SafeAreaView style={styles.contaier}>
      <Header />

      <Searchbar seacrh={search} setSearch={setSearch} />
     {/*  <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.product}>{item.name}</Text>}
      /> */}

      <Products />

      <Button
        buttonStyle={styles.modalButton}
        buttonTextColor="white"
        title="Sell Product"
        onPress={handleInputToggle}
      />
      <AddProcutModal visible={inputModalVisible} onClose={handleInputToggle} />
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
    backgroundColor: 'black',
  },
});
