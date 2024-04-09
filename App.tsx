import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, SafeAreaView, Animated, Text, TouchableOpacity, View } from "react-native";

// LoginComponent를 import합니다.
import LoginComponent from "./LoginComponent";
import AgreePage from "./AgreePage";
import NickName from "./NickName";
import MainPage from './MainPage';
import PathScreen from './PathScreen';
import SearchScreen from './SearchScreen';

const App = ({ navigation }) => {
  const imageOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleInquiry = () => {
    console.log("문의하기 버튼이 눌렸습니다.");
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Animated.Image
        source={require('./img/img_MainBackground.jpg')}
        style={{ ...styles.backgroundImage, opacity: imageOpacity }}
      />
      <Text style={styles.text}>맞대구</Text>
      <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.leftTopContainer}>
        <TouchableOpacity onPress={handleInquiry} style={styles.inquiryButton}>
          <Text style={styles.inquiryButtonText}>문의하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backgroundImage: {
    flex: 0.5,
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
    position: 'absolute',
    top: '10%',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#3498db',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  leftTopContainer: {
    position: 'absolute',
    top: '85%',
    left: '50%',
  },
  inquiryButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
      alignSelf: 'center', // 가운데 정렬
      position: 'absolute',
      bottom: 0, // 화면의 하단에 배치
  },
});

// createStackNavigator를 사용하여 Stack Navigator를 생성합니다.
const Stack = createStackNavigator();

// NavigationContainer로 감싸고 Stack Navigator를 설정합니다.
const AppNavigator = () => {
  return (
    <NavigationContainer>
<Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={App} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginComponent} />
        <Stack.Screen name="AgreePage" component={AgreePage} />
        <Stack.Screen name="NickName" component={NickName} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="PathScreen" component={PathScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
