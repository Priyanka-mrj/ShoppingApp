import React from 'react';
import { View, Text, FlatList, ListRenderItem, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart } from '../store/slices/cartSlice';
import CustomButton from '../components/CustomButton';
import VegetableDropdown from '../components/DropDown';

interface CartItem {
  productId: string;
  quantity: number;
}

const CartScreen: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const products = useSelector((state: RootState) => state.products.products);

  const renderItem: ListRenderItem<[string, number]> = ({ item }) => {
    const product = products.find(p => p.hs_code === item[0]);
    if (!product) return null; // Handle case where product is not found (although ideally, it should always be found)

    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/carrot.jpg')}
          resizeMode='cover'
          style={styles.image}
        />
        <Text style={styles.text}>{product.name}</Text>
        <Text style={styles.quatity}>Quantity: {item[1]}</Text>
        <View style={styles.view}>
          <VegetableDropdown />
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.pricetext}>{product?.mrp?.currency} {product?.mrp?.mrp}</Text>
          <View style={styles.button}>
            <CustomButton title="Remove" onPress={() => dispatch(removeFromCart(item[0]))} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={Object.entries(cartItems)}
      keyExtractor={(item) => item[0]}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 490,
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
  },
  image: {
    width: '100%',
    height: '45%',
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
  quatity: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212124',
    marginLeft: 14,
    marginTop: 10,
  }
});

export default CartScreen;
