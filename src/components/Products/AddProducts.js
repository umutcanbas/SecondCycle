import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import Button from '../Button/Button';
import Input from '../Input';

import {showMessage} from 'react-native-flash-message';

const AddProducts = ({onClose}) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth().currentUser;
      setUserId(currentUser.uid);
    };

    fetchUserData();
  }, []);

  const AddProduct = () => {
    if (productName && description && price) {
      const newProduct = {
        productName,
        description,
        price,
        userId,
      };

      database()
        .ref(`/products/${userId}`)
        .push(newProduct)
        .then(() => {
          setProductName('');
          setDescription('');
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
    <View style={styles.container}>
      <Input
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
        style={styles.input}
      />
      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{...styles.input, height: 70}}
      />
      <Input
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
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
