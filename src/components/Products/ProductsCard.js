import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import database from '@react-native-firebase/database';

import {useNavigation} from '@react-navigation/native';
import routes from '../../navigation/routes';

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const goProductDetails = () => {
    navigation.navigate(routes.WITH_OUT_TAB, {
      screen: routes.PRODUCT_DETAIL,
    });
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      numColumns={2}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={goProductDetails}
          activeOpacity={0.6}
          style={styles.productContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/png/ProductDefault.png')}
            />
          </View>

          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.userName}>{item.username}</Text>
          <Text style={styles.price}>$ {item.price}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.key}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    margin: 15,
    padding: 10,
    borderWidth: 0.2,
    borderRadius: 15,
    borderColor: 'black',
    width: 170,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
  },
});

export default ProductCard;
