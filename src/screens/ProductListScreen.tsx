import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image,ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { fetchProducts } from '../store/slices/productSlice';
import { RootState } from '../store';
import CustomButton from '../components/CustomButton';
import VegetableDropdown from '../components/DropDown';

type RootStackParamList = {
  ProductDetails: { productId: string };
  // other screen types...
};

type ProductListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetails'
>;

type ProductListScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetails'
>;

type Props = {
  navigation: ProductListScreenNavigationProp;
  route: ProductListScreenRouteProp;
};

const ProductListScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/carrot.jpg')}
          resizeMode='cover'
          style={styles.image}
        />
        <Text style={styles.text}>{item.name}</Text>
        <View style={styles.view}>
        <VegetableDropdown />
        </View>
        <View style= {styles.viewStyle}>
        <Text style={styles.pricetext}>{item.mrp.currency} {item.mrp.mrp}</Text>
        <View style={styles.button}>
        <CustomButton title="View Details" onPress={() => navigation.navigate('ProductDetails', {productId: item.hs_code, product: item })} />
        </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }
  if (error) return <Text>Error: {error}</Text>;

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingBottom: 20,
  },
  container: {
    width: 'auto',
    height: 380,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    overflow: 'hidden',
    margin: 15,
    marginBottom: 5,
    position: 'relative',
    zIndex: 0,
  },
  image: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    resizeMode: 'cover',
  },
  text: {
    marginTop: 20,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
    color: '#212124',
  },
  pricetext: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212124',
    marginLeft: 14,
    marginTop: 10,
  },
  view: {
    marginTop: 10
  },
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    marginTop: 10
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ProductListScreen;
