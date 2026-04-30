import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, TextInput, ActivityIndicator, StyleSheet, Text, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { getNews, setSearchQuery, resetNews } from '../store/newsSlice';
import { RootState, AppDispatch } from '../store';
import NewsItem from '../components/NewsItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const insets = useSafeAreaInsets();
  const { articles, loading, page, hasMore, searchQuery } = useSelector((state: RootState) => state.news);
  const [refreshing, setRefreshing] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const loadMoreNews = () => {
    if (hasMore && !loading) {
      dispatch(getNews({ page, query: searchQuery }));
    }
  };

  useEffect(() => {
    // Initial load only
    if (articles.length === 0 && !loading && hasMore && searchQuery === '') {
      dispatch(getNews({ page: 1, query: '' }));
    }
  }, []); // Only run on mount

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(resetNews());
    await dispatch(getNews({ page: 1, query: searchQuery }));
    setRefreshing(false);
  };

  const handleSearch = () => {
    dispatch(setSearchQuery(localSearch));
    dispatch(getNews({ page: 1, query: localSearch }));
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  };

  if (loading && articles.length === 0) {
    return (
      <View style={styles.centerLoader}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loaderText}>Fetching latest news...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search news..."
          value={localSearch}
          onChangeText={setLocalSearch}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewsItem 
            article={item} 
            onPress={() => navigation.navigate('Details', { article: item })} 
          />
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        onEndReached={loadMoreNews}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        ListEmptyComponent={
          !loading ? <Text style={styles.emptyText}>No articles found.</Text> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  loader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
  centerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loaderText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});

export default HomeScreen;
