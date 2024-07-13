import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { setUser } from '../store/slices/authSlice';
import CustomButton from '../components/CustomButton'; 

type RootStackParamList = {
  ProductList: undefined;
  // other screen types...
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductList'
>;

type LoginScreenRouteProp = RouteProp<RootStackParamList, 'ProductList'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '353457231855-ofnfv3rpciscpc3ch8eqk34s7rla0bkj.apps.googleusercontent.com', // Get this from Google Cloud Console
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      dispatch(setUser(userInfo));
      navigation.navigate('ProductList');
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View style={styles.container}>
      <CustomButton title="Sign in with Google" onPress={signIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 360,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
export default LoginScreen;
