import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const Checkbox = ({ label, checked, onChange, isBold }) => {
  return (
    <View style={styles.checkboxContainer}>
      <Text style={[styles.checkboxLabel, isBold && styles.boldLabel]}>{label}</Text>
      <TouchableOpacity onPress={onChange}>
        <View style={[styles.checkbox, checked && styles.checkedCheckbox]}>
          {checked && <Text style={styles.checkMark}>&#10003;</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const AgreePage = ({ navigation }) => {
  const [allAgreed, setAllAgreed] = useState(false);
  const [agreements, setAgreements] = useState({
    ageAgreed: false,
    serviceAgreed: false,
    personalInfoAgreed: false,
    locationAgreed: false,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '약관 동의',
    });
  }, [navigation]);

  const handleCheckboxChange = (key) => {
    setAgreements((prevAgreements) => {
      const newAgreements = { ...prevAgreements, [key]: !prevAgreements[key] };

      if (key !== 'allAgreed' && newAgreements[key]) {
        newAgreements.allAgreed =
          newAgreements.ageAgreed &&
          newAgreements.serviceAgreed &&
          newAgreements.personalInfoAgreed &&
          newAgreements.locationAgreed;
      }

      if (key !== 'allAgreed' && !newAgreements[key]) {
        newAgreements.allAgreed = false;
      }

      setAllAgreed(newAgreements.allAgreed);
      return newAgreements;
    });
  };

  const handleAllAgreementChange = () => {
    setAgreements((prevAgreements) => {
      const allChecked = !Object.values(prevAgreements).every((value) => value === true);
      const newAgreements = {};
      for (const key in prevAgreements) {
        newAgreements[key] = allChecked;
      }
      setAllAgreed(allChecked);
      return newAgreements;
    });
  };

  const isButtonDisabled = !allAgreed;

  const handleAgreeButtonClick = () => {
    console.log('동의하기 버튼이 눌렸습니다');
    navigation.navigate('NickName');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Checkbox label="전체 동의합니다" checked={allAgreed} onChange={handleAllAgreementChange} isBold={true} />
      <Checkbox label="만 14세 이상입니다.(필수)" checked={agreements.ageAgreed} onChange={() => handleCheckboxChange('ageAgreed')} />
      <Checkbox label="서비스 이용약관(필수)" checked={agreements.serviceAgreed} onChange={() => handleCheckboxChange('serviceAgreed')} />
      <Checkbox label="개인정보 수집 및 이용 동의(필수)" checked={agreements.personalInfoAgreed} onChange={() => handleCheckboxChange('personalInfoAgreed')} />
      <Checkbox label="위치서비스 이용 동의(필수)" checked={agreements.locationAgreed} onChange={() => handleCheckboxChange('locationAgreed')} />

      <TouchableOpacity
        style={[styles.agreeButton, isButtonDisabled ? styles.disabledButton : null]}
        onPress={handleAgreeButtonClick}
        disabled={isButtonDisabled}
      >
        <Text style={styles.agreeButtonText}>동의하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: 'black',
  },
  agreeButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  agreeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  boldLabel: {
    fontWeight: 'bold',
    color: 'black', // 완전 검은색 추가
  },
  disabledButton: {
    backgroundColor: 'lightgrey', // Change to the desired color for the disabled state
  },
});

export default AgreePage;
