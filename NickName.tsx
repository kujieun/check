import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

const NickName = ({ navigation }) => {
  const [nickname, setNickname] = useState('');

  const handleSaveNickname = () => {
    // Handle saving the nickname, you can implement your logic here
    console.log(`Nickname saved: ${nickname}`);
    navigation.navigate('MainPage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChangeText={(text) => setNickname(text)}
          keyboardType="default"
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveNickname}>
        <Text style={styles.saveButtonText}>저장하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center', // Center the input horizontally
  },
  input: {
    fontFamily: 'YourKoreanFont',
    width: '100%', // Use 100% width within the container
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    textAlignVertical: 'center', // Center the text vertically
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 7,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default NickName;
