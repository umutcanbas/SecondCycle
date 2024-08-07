import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Button from '../../components/Button/Button';
import BackButton from '../../components/Button/BackButton';

import database from '@react-native-firebase/database';
import {showMessage} from 'react-native-flash-message';

import {useNavigation} from '@react-navigation/native';
import routes from '../../navigation/routes';

const ProductDetail = ({route}) => {
  const product = route.params.product;

  const [user, setUser] = useState({});

  const navigation = useNavigation();

  const getUserData = () => {
    const userId = product?.userId;
    if (userId) {
      database()
        .ref(`/users/${userId}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.exists()) {
            setUser(snapshot.val());
          }
        })
        .catch(error => {
          showMessage({
            message: 'Faill',
            type: 'danger',
          });
        });
    } else {
      alert('User ID not found.');
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Product data not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <Image
        source={require('../../assets/png/ProductDefault.png')}
        style={styles.image}
      />

      <View style={styles.header}>
        <Text style={styles.product}>{product?.productName}</Text>
      </View>

      <View style={styles.content}>
        <View>
          <Text style={styles.title}>Ad Number</Text>
          <Text style={styles.title}>Seller Name</Text>
          <Text style={styles.title}>Location</Text>
          <Text style={styles.title}>Price</Text>
          <Text style={styles.title}>Phone Number</Text>
        </View>

        <View>
          <Text style={styles.productID}>{product?.id.slice(-8)}</Text>
          <Text style={styles.comment}>{user?.name}</Text>
          <Text style={styles.comment}>{user?.address}</Text>
          <Text style={styles.price}>{product?.price} $</Text>
          <Text style={styles.comment}>{user?.phone}</Text>
        </View>
      </View>

      <Text style={styles.detailHeaderText}>Details</Text>
      <ScrollView style={styles.detailContainer}>
        <Text style={styles.detailText}>{product?.description}</Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title="Send Message"
          onPress={() =>
            navigation.navigate(routes.CHATSCREEN, {data: product})
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  product: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  content: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    justifyContent: 'space-around',
    borderBottomWidth: 0.2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    margin: 5,
    borderBottomWidth: 0.2,
  },
  comment: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    margin: 5,
  },
  productID: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    margin: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    margin: 5,
  },
  detailContainer: {
    width: 'auto',
    height: 250,
  },
  detailHeaderText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
    marginBottom: 15,
  },
  detailText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default ProductDetail;
