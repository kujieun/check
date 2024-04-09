// MainPage.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import PathScreen from './PathScreen';
import ReviewScreen from './ReviewScreen';
import CardScreen from './CardScreen';

const Tab = createBottomTabNavigator();

const MainPage = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // Hide the back button
      headerTitle: '', // Hide the header title
      headerShown: false, // Hide the entire header
    });
  }, [navigation]);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Path" component={PathScreen} />
      <Tab.Screen name="Review" component={ReviewScreen} />
       <Tab.Screen name="Card" component={CardScreen} />
      {/* 다른 탭들도 필요에 따라 추가 */}
    </Tab.Navigator>
  );
};

export default MainPage;
