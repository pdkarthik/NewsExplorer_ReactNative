import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmark } from '../store/newsSlice';
import { RootState } from '../store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC<Props> = ({ route }) => {
  const { article } = route.params;
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const bookmarks = useSelector((state: RootState) => state.news.bookmarks);
  const isBookmarked = bookmarks.some(item => item.id === article.id);

  const handleBookmark = () => {
    dispatch(toggleBookmark(article));
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\nRead more at: ${article.url}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
      <Image source={{ uri: article.urlToImage }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.source}>{article.source.name}</Text>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.date}>{new Date(article.publishedAt).toLocaleString()}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={handleBookmark}>
            <Text style={[styles.buttonText, isBookmarked && styles.activeButton]}>
              {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleShare}>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{article.description}</Text>
        <Text style={styles.body}>{article.content || 'Full content not available.'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  source: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 8,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
  activeButton: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    lineHeight: 26,
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

export default DetailsScreen;
