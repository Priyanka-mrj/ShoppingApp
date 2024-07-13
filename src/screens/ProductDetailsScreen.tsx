
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { RootState } from '../store';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';
import CustomButton from '../components/CustomButton'; 
import VegetableDropdown from '../components/DropDown';
import BarcodeScannerScreen from './BarcodeScannerScreen';

type RootStackParamList = {
  ProductDetails: { productId: string };
  // other screen types...
};

type ProductDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetails'
>;

type ProductDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetails'
>;

type Props = {
  navigation: ProductDetailsScreenNavigationProp;
  route: ProductDetailsScreenRouteProp;
};

const ProductDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { productId, product } = route.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const cart = useSelector((state: RootState) => state.cart.items);
  const [inCart, setInCart] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  useEffect(() => {
    if (product) {
      const isInCart = cart[productId] > 0; // Check if the current product is in the cart
      setInCart(isInCart);
    }
  }, [cart, productId, product, isFocused]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product.hs_code));
      setInCart(true); // Once added to cart, set inCart to true
    }
  };

  const handleGoToCart = () => {
    navigation.navigate('Cart');
  };

  const handleBarcodeScanned = (barcode: string) => {

    Alert.alert(`Barcode scanned: ${barcode}`);

    setShowScanner(false);

  };
  if (!product) return <Text>Product not found</Text>;

  return (
    <>
    <View style={styles.container}>
        <Image
          source={require('../assets/carrot.jpg')}
          resizeMode='cover'
          style={styles.image}
        />
        <Text style={styles.text}>{product.name}</Text>
        <View style={styles.view}>
        <VegetableDropdown />
        </View>
        <View style= {styles.viewStyle}>
        <Text style={styles.pricetext}>{product?.mrp?.currency} {product?.mrp?.mrp}</Text>
        <View style={styles.button}>
        {!inCart ? (
        <CustomButton title="Add to Cart" onPress={handleAddToCart} />
      ) : (
        <CustomButton title="Go to Cart" onPress={handleGoToCart} />
      )}
        </View>
        </View>
       
      </View>
      <View style={styles.scanbutton}>
      <CustomButton title="Scan Barcode" onPress={() => setShowScanner(true)} />   
      </View>
       {showScanner && <BarcodeScannerScreen onBarcodeScanned={handleBarcodeScanned} />}
       </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingBottom: 20,
  },
  container: {
    width: 'auto',
    height: "auto",
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
    height: '50%',
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
  scanbutton: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ProductDetailsScreen;


