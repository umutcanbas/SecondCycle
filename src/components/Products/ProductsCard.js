import React, {useState, useEffect} from 'react';

import {View, Text, FlatList, Image, StyleSheet} from 'react-native';

import database from '@react-native-firebase/database';

const ProductCard = () => {
  const [products, setProducts] = useState([]);

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
      });

    return () => database().ref('/products').off('value', onValueChange);
  }, []);

  return (
    <FlatList
      data={products}
      renderItem={({item}) => (
        <View style={styles.productContainer}>
          {item.imageUrl?.length > 10 ? (
            <Image source={{uri: item.imageUrl}} style={styles.image} />
          ) : null}
          <Text style={styles.productName}>{item.name}</Text>
          <Text>{item.username}</Text>
          <Text>{item.description}</Text>
          <Text>{item.location}</Text>
          <Text>{item.price}</Text>
        </View>
      )}
      keyExtractor={item => item.key}
    />
  );
};

const styles = StyleSheet.create({
  productContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 100,
    height: 100,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductCard;
