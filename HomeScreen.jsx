// HomeScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';

const HomeScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Home',
      headerTitleAlign: 'left',
    });
  }, [navigation]);

  // Function to render horizontally scrolling photos
  const renderPhotos = (category) => {
    // Data for each subtitle (dummy data for illustration)
    const photosData = {
      landmark: [
        { id: 1, image: require('./img/img_landmark1.png'), link: 'https://blog.naver.com/daegu_news/221687273606' },
        { id: 2, image: require('./img/img_landmark2.png'), link: 'https://blog.naver.com/daegu_news/221687273606' },
        { id: 3, image: require('./img/img_landmark3.png'), link: 'https://blog.naver.com/daegu_news/221687273606' },
        // Add more landmark items if needed
      ],
      event: [
        { id: 1, image: require('./img/img_event1.png'), link: 'https://tour.daegu.go.kr/index.do?menu_id=00002932&menu_link=/front/tour/tourMapsView.do' },
        { id: 2, image: require('./img/img_event2.png'), link: 'https://tour.daegu.go.kr/index.do?menu_id=00002932&menu_link=/front/tour/tourMapsView.do' },
        { id: 3, image: require('./img/img_event3.png'), link: 'https://tour.daegu.go.kr/index.do?menu_id=00002932&menu_link=/front/tour/tourMapsView.do' },
        // Add more event items if needed
      ],
      theme: [
        { id: 1, image: require('./img/img_theme1.png'), link: 'https://blog.naver.com/daegu_news/221687273606' },
        { id: 2, image: require('./img/img_theme2.png'), link: 'https://blog.naver.com/daegu_news/221687273606' },
        // Add more theme items if needed
      ],
      info: [
        { id: 1, image: require('./img/img_info1.png'), link: 'https://blog.naver.com/daegu_news/221687273606' },
        // Add more info items if needed
      ],
    };

    return (
      <ScrollView horizontal>
        {photosData[category].map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => Linking.openURL(item.link)}
            style={{ margin: 10 }}
          >
            {/* Card component representing the place image */}
            <View style={styles.cardContainer}>
              <Image source={item.image} style={styles.cardImage} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>수원을 소개합니다!</Text>

      {/* Add horizontally scrolling photos for each subtitle */}
      <Text style={styles.subheaderText}>랜드마크</Text>
      {renderPhotos('landmark')}

      <Text style={styles.subheaderText}>행사</Text>
      {renderPhotos('event')}

      <Text style={styles.subheaderText}>테마</Text>
      {renderPhotos('theme')}

      <Text style={styles.subheaderText}>정보</Text>
      {renderPhotos('info')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  cardContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: 100,
    height: 80,
    borderRadius: 10,
  },
  cardTitle: {
    marginTop: 5,
    textAlign: 'center',
  },
});

export default HomeScreen;
