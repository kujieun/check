import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Linking } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const [placeList, setPlaceList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showRecommended, setShowRecommended] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null); // 추가된 부분
  const navigation = useNavigation();
  navigation.setOptions({ title: '장소 검색' });

  useEffect(() => {
    if (showRecommended) {
      fetchRecommendedResults();
    } else {
      fetchPlaceData();
    }
  }, [showRecommended, page]);

  const fetchRecommendedResults = async () => {
    const recommendedResults = [
      { id: 1, place_name: '추천 장소 1', address_name: 'Address 1' },
      { id: 2, place_name: '추천 장소 2', address_name: 'Address 2' },
      { id: 3, place_name: '추천 장소 3', address_name: 'Address 3' },
    ];

    setPlaceList(recommendedResults);
    setNoResults(false);
  };

  const fetchPlaceData = async () => {
    try {
      const apiKey = '498e9d75770642524f88067768d067b9';
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${searchQuery}&page=${page}`,
        {
          headers: {
            Authorization: `KakaoAK ${apiKey}`,
          },
        }
      );

      if (page === 1) {
        setPlaceList(response.data.documents);
      } else {
        setPlaceList((prevList) => [...prevList, ...response.data.documents]);
      }

      setNoResults(response.data.documents.length === 0);
    } catch (error) {
      console.error('Error fetching place data:', error);
    }
  };

  const handlePlaceClick = (placeId) => {
    const kakaomapUrl = `kakaomap://place?id=${placeId}`;
    Linking.openURL(kakaomapUrl);
  };

  const loadMoreResults = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearch = () => {
    setShowRecommended(false);
    setPage(1);
    fetchPlaceData();
  };

const handleSelection = (selectedPlace) => {
  navigation.navigate('PathScreen', { selectedPlace });
};


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="키워드를 입력하세요"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>검색</Text>
        </TouchableOpacity>
      </View>

      {noResults ? (
        <Text style={styles.noResultsText}>검색 결과가 없습니다</Text>
      ) : (
        <FlatList
          data={placeList}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id} onPress={() => handlePlaceClick(item.id)}>
              <View style={styles.placeItem}>
                <Text style={styles.placeName}>{item.place_name}</Text>
                <Text style={styles.address}>{item.address_name}</Text>
                <TouchableOpacity onPress={() => handleSelection(item)}>
                  <Text style={styles.selectButton}>선택</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          onEndReached={loadMoreResults}
          onEndReachedThreshold={0.1}
        />
      )}

      {selectedPlace && (
        <Text style={styles.selectedPlaceText}>{`선택된 장소: ${selectedPlace.place_name}`}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: '#666',
  },
  selectButton: {
    color: '#007bff',
    fontWeight: 'bold',
    textAlign: 'right',
    paddingHorizontal: 10,
  },
  noResultsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  selectedPlaceText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#4CAF50',
  },
});

export default SearchScreen;
