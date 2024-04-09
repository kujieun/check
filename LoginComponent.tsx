// LoginComponent.tsx
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const LoginComponent: () => React.Node = () => {
  // GoogleSignin 초기화
    const navigation = useNavigation();  // 이 부분 추가
  const configureGoogleSignIn = async () => {
    await GoogleSignin.configure();
  };

  React.useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const login = () => {
    KakaoLogin.login()
      .then((result) => {
        console.log('Kakao Login Success', JSON.stringify(result));
        getProfile();
        navigation.navigate('AgreePage');
      })
      .catch((error) => {
        if (error.code === 'E_CANCELLED_OPERATION') {
          console.log('Kakao Login Cancel', error.message);
        } else {
          console.log(`Kakao Login Fail(code:${error.code})`, error.message);
        }
      });
  };

  const getProfile = () => {
    KakaoLogin.getProfile()
      .then((result) => {
        console.log('GetProfile Success', JSON.stringify(result));
      })
      .catch((error) => {
        console.log(`GetProfile Fail(code:${error.code})`, error.message);
      });
  };

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Login Success', userInfo);
      // 여기에 추가적인 로직이나 상태 업데이트를 할 수 있습니다.
      navigation.navigate('AgreePage');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Google Login Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google Login is in progress already');
      } else {
        console.log('Google Login Fail', error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.leftTopContainer}>
        <TouchableOpacity onPress={() => login()}>
          <Image
            source={require('./img/img_kakaotalk.png')}
            style={styles.kakaoImage}
          />
        </TouchableOpacity>
        <Text style={styles.loginText}>카카오톡으로 로그인</Text>
      </View>
      <View style={styles.googleContainer}>
        <TouchableOpacity onPress={() => googleLogin()}>
          <Image
            source={require('./img/img_google.png')}
            style={styles.googleImage}
          />
        </TouchableOpacity>
        <Text style={styles.loginText}>구글로 로그인</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  leftTopContainer: {
    position: 'absolute',
    left: 100,
    top: 170,
    padding: 20,
    alignItems: 'center', // Center the items horizontally
  },
  googleContainer: {
    position: 'absolute',
    left: 120,
    top: 320, // Adjust the top position as needed
    padding: 20,
    alignItems: 'center',
  },
  kakaoImage: {
    width: 70,
    height: 70,
  },
  googleImage: {
    width: 65,
    height: 65,
  },
  loginText: {
    marginTop: 10, // Adjust the spacing between the image and text
  },
});

export default LoginComponent;