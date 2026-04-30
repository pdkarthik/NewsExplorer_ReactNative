import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import NewsItem from '../components/NewsItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type BookmarksScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Bookmarks'>;

interface Props {
  navigation: BookmarksScreenNavigationProp;
}

const BookmarksScreen: React.FC<Props> = ({ navigation }) => {
  const bookmarks = useSelector((state: RootState) => state.news.bookmarks);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewsItem 
            article={item} 
            onPress={() => navigation.navigate('Details', { article: item })} 
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No bookmarks yet.</Text>
            <Text style={styles.subText}>Articles you bookmark will appear here.</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: insets.bottom }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});

export default BookmarksScreen;
