import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NewsArticle } from '../types';

interface Props {
  article: NewsArticle;
  onPress: () => void;
}

const NewsItem: React.FC<Props> = ({ article, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Image 
        source={{ uri: article.urlToImage || 'https://via.placeholder.com/150' }} 
        style={styles.image} 
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
        <Text style={styles.description} numberOfLines={3}>{article.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.source}>{article.source.name}</Text>
          <Text style={styles.date}>{new Date(article.publishedAt).toLocaleDateString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  source: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});

export default React.memo(NewsItem);
