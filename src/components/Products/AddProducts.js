import React, {useState} from 'react';

import {View, TextInput, StyleSheet} from 'react-native';

import database from '@react-native-firebase/database';

import Button from '../Button';

import {showMessage} from 'react-native-flash-message';

const AddProducts = ({onClose}) => {
  const [productName, setProductName] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');

  const AddProduct = () => {
    if (productName && username && description && price) {
      const newProduct = {
        name: productName,
        username,
        description,
        price,
        location,
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
          showMessage({
            message: 'Added',
            type: 'success',
          });
          onClose();
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
        style={{...styles.input, height: 70}}
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
    alignItems: 'center',
  },
});

export default AddProducts;
