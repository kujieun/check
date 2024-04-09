// ReviewScreen.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReviewScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Card Tab Content</Text>
      {/* 추가적인 디자인 요소 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReviewScreen;
