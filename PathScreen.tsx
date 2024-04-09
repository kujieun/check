// PathScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const PathScreen = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDateButtonText, setStartDateButtonText] = useState('출발 날짜 선택');
  const [endDateButtonText, setEndDateButtonText] = useState('종료 날짜 선택');
  const [currentPage, setCurrentPage] = useState(0);

  const handleRecommendationPress = () => {
    console.log("맞대구가 추천하는 경로 버튼이 눌렸습니다");
    // 맞대구가 추천하는 경로에 대한 로직 추가
  };

  const navigation = useNavigation();
  const route = useRoute();
  const { selectedPlace } = route.params || {};

  const handleAddPlace = () => {
    console.log("장소추가");
    navigation.navigate('SearchScreen'); // SearchScreen 이동
  };

  const handleStartDateSelection = (selectedDate) => {
    setStartDate(selectedDate);
    hideStartDatePicker();

    const formattedStartDate = selectedDate.toISOString().split('T')[0];
    setStartDateButtonText(`출발 날짜 선택\n${formattedStartDate}`);

    if (endDate < selectedDate) {
      setEndDate(selectedDate);
      const formattedEndDate = selectedDate.toISOString().split('T')[0];
      setEndDateButtonText(`종료 날짜 선택\n${formattedEndDate}`);
    }
  };

  const handleEndDateSelection = (selectedDate) => {
    setEndDate(selectedDate);
    hideEndDatePicker();

    const formattedDate = selectedDate.toISOString().split('T')[0];
    setEndDateButtonText(`종료 날짜 선택\n${formattedDate}`);
  };

  const toggleStartDatePicker = () => {
    if (isStartDatePickerVisible) {
      hideStartDatePicker();
    } else {
      setStartDatePickerVisibility(true);
      setEndDatePickerVisibility(false);
    }
  };

  const toggleEndDatePicker = () => {
    if (isEndDatePickerVisible) {
      hideEndDatePicker();
    } else {
      setEndDatePickerVisibility(true);
      setStartDatePickerVisibility(false);
    }
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    const lastPage = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const generatePlanCards = () => {
    const dateDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
    const planCards = [];

    for (let i = 0; i <= dateDifference; i++) {
      if (i === currentPage) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const formattedDate = currentDate.toISOString().split('T')[0];

        const latitude = 33.450701 + i * 0.01;
        const longitude = 126.570667 + i * 0.01;

        planCards.push(
<View key={i} style={styles.planCard}>
 <Text>{`Day${i + 1} : ${formattedDate}`}</Text>

  <View style={styles.rowContainer}>
    {/* 지도 표시 */}
    <WebView
      source={{ html: getKakaoMapHTML(latitude, longitude) }}
      style={styles.mapWebView}
    />

    {/* 장소 추가 버튼과 선택한 장소 이름 */}
    <View style={styles.rightContent}>
      <TouchableOpacity onPress={handleAddPlace} style={styles.addButton}>
        <Text style={styles.addButtonText}>장소 추가</Text>
      </TouchableOpacity>
      {selectedPlace && (
        <Text>{selectedPlace.place_name}</Text>
      )}
    </View>
  </View>
</View>

        );
      }
    }

    return planCards;
  };


  const getKakaoMapHTML = (latitude, longitude) => {
    const appKey = '8e1c4433e5a001ae60be22ac60db3c79';
    return `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services,clusterer,drawing"></script>
        </head>
        <body>
          <div id="map" style="width:100%;height:100%;"></div>
          <script type="text/javascript">
            (function () {
              const container = document.getElementById('map');
              const options = {
                center: new kakao.maps.LatLng(${latitude}, ${longitude}),
                level: 3
              };
              const map = new kakao.maps.Map(container, options);
              const geocoder = new kakao.maps.services.Geocoder();
            })();
          </script>
        </body>
      </html>
    `;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleRecommendationPress} style={styles.button}>
        <Text style={styles.buttonText}>맞대구가 추천하는 경로 ➡️</Text>
      </TouchableOpacity>

      <View style={styles.dateButtonContainer}>
        <TouchableOpacity onPress={toggleStartDatePicker} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>{startDateButtonText}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleEndDatePicker} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>{endDateButtonText}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.datePickerContainer}>
          {isStartDatePickerVisible && (
            <DatePicker
              isVisible={isStartDatePickerVisible}
              mode="date"
              date={startDate}
              onDateChange={handleStartDateSelection}
              onConfirm={handleStartDateSelection}
              onCancel={hideStartDatePicker}
            />
          )}
        </View>

        <View style={styles.datePickerContainer}>
          {isEndDatePickerVisible && (
            <DatePicker
              isVisible={isEndDatePickerVisible}
              mode="date"
              date={endDate}
              onDateChange={handleEndDateSelection}
              onConfirm={handleEndDateSelection}
              onCancel={hideEndDatePicker}
            />
          )}
        </View>
      </View>

      <View style={styles.mapAndButtonContainer}>
        <View style={styles.mapContainer}>
          {/* Your map component goes here */}
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} scrollEnabled={false}>
        <View style={styles.planContainer}>
          {generatePlanCards()}
        </View>
      </ScrollView>

      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={goToPreviousPage} style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}>이전 페이지</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToNextPage} style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}>다음 페이지</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  dateButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  dateButtonText: {
    textAlign: 'center',
    fontSize: 15,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '0%',
  },
  datePickerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
planCard: {
  padding: 10,
  borderWidth: 1,
  borderRadius: 10,
  marginBottom: 20,
  width: '100%',
  height: 'auto', // 플랜카드의 높이를 자동으로 조절하도록 변경
  overflow: 'hidden', // 내용이 넘칠 경우 숨김 처리
},
rowContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start', // 세로 정렬을 위해 추가
  marginTop: 10,
},

rightContent: {
  flex: 1,
  marginLeft: 10,
  justifyContent: 'center',
},
mapWebView: {
  flex: 1,
  width: '100%',
  borderRadius: 8,
  height: 380,
  marginRight: 10, // 우측 마진 추가
},
addButton: {
  backgroundColor: '#2ecc71',
  padding: 10,
  borderRadius: 5,
  width: '100%',
  height: 40,
  marginLeft: 0, // 좌측 마진 추가
},


  addButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    marginLeft: 0,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  navigationButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  navigationButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});



export default PathScreen;
