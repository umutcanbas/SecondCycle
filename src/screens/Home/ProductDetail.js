import React from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';

const ProductDetail = ({route}) => {
  const product = route.params.product;

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product data not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/png/ProductDefault.png')}
        style={styles.image}
      />
      <Text style={styles.name}>{product?.name}</Text>
      <Text style={styles.username}>{product?.username}</Text>
      <Text style={styles.description}>{product?.description}</Text>
      <Text style={styles.location}>{product?.location}</Text>
      <Text style={styles.price}>$ {product?.price}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  location: {
    fontSize: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default ProductDetail;
