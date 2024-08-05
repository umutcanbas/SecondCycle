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

import parseContentData from '../../utils/parseContentData';


const Products = ({userProducts, children}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();



  useEffect(() => {
    const onValueChange = database()
      .ref('/products')
      .on('value', snapshot => {
        const obj = snapshot.val();

        if (obj) {
          const productsData = Object.values(obj)
            .map(productList => Object.values(parseContentData(productList)))
            .flat();

          database()
            .ref('/users')
            .once('value')
            .then(userSnapshot => {
              const users = userSnapshot.val();
              const productsWithUsernames = productsData.map(product => ({
                ...product,
                username: users[product.userId]
                  ? users[product.userId].name
                  : 'Unknown',
              }));
              setProducts(productsWithUsernames);
            });
        } else {
          setProducts([]);
        }
      });

    return () => {
      database().ref('/products').off('value', onValueChange);
    };
  }, []);

  useEffect(() => {
    if (userProducts && Array.isArray(userProducts)) {
      setProducts(userProducts);
    }
  }, [userProducts]);

  const goProductDetails = product => {
    navigation.navigate(routes.WITH_OUT_TAB, {
      screen: routes.PRODUCT_DETAIL,
      params: {
        product,
      },
    });
  };

  const data = userProducts ? userProducts : products;


  const RenderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => goProductDetails(item)}
      activeOpacity={0.6}
      style={styles.productContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/png/ProductDefault.png')}
        />
      </View>

      <Text style={styles.productName}>{item.productName}</Text>
      <Text style={styles.userName}>{item.username}</Text>
      <Text style={styles.price}>$ {item.price}</Text>
    </TouchableOpacity>
  );


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({item}) => <RenderItem item={item} />}
        keyExtractor={(item, index) => `${item.userId}-${index}`}
        ListFooterComponent={() => children}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    margin: 8,
    padding: 10,
    borderWidth: 0.2,
    borderRadius: 15,
    borderColor: 'black',
    width: 170,
    height: 180,
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
    color: 'green',
  },
});

export default Products;
