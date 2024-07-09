import React, {useState} from 'react';

import {View, TextInput, Button, StyleSheet} from 'react-native';

import database from '@react-native-firebase/database';

import {showMessage} from 'react-native-flash-message';

const AddProducts = () => {
  const [productName, setProductName] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const AddProduct = () => {
    if (productName && username && description && price && imageUrl) {
      const newProduct = {
        name: productName,
        username,
        description,
        price,
        location,
        imageUrl,
      };

      database()
        .ref('/products')
        .push(newProduct)
        .then(() => {
          setProductName('');
          setUsername('');
          setDescription('');
          setLocation('');
          setPrice('');
          setImageUrl('');
          showMessage({
            message: 'Added',
            type: 'succes',
          });
        })
        .catch(error => {
          showMessage({
            message: 'Fail',
            type: 'error',
          });
        });
    } else {
      showMessage({
        message: 'Please fill in all fields.',
        type: 'error',
      });
    }
  };

  return (
    <View contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Product" onPress={AddProduct} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  buttonContainer: {
    marginVertical: 20,
  },
});

export default AddProducts;
