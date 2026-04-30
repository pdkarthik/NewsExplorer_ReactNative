import axios from 'axios';
import { NewsResponse, NewsArticle } from '../types';

// Spaceflight News API v4 - Public Endpoint
const BASE_URL = 'https://api.spaceflightnewsapi.net/v4';

export const fetchTopHeadlines = async (page: number = 1, pageSize: number = 20, query: string = ''): Promise<NewsResponse> => {
  try {
    const offset = (page - 1) * pageSize;
    
    // Spaceflight API supports 'search' parameter for querying
    const params: any = {
      limit: pageSize,
      offset: offset,
    };
    
    if (query) {
      params.search = query;
    }

    const response = await axios.get(`${BASE_URL}/articles/`, { params });
    const data = response.data;

    // Map the Spaceflight API response to our app's NewsArticle interface
    const articles: NewsArticle[] = data.results.map((item: any) => ({
      id: item.id.toString(),
      title: item.title,
      description: item.summary || 'No description available',
      url: item.url,
      urlToImage: item.image_url || 'https://via.placeholder.com/400x200?text=No+Image',
      publishedAt: item.published_at,
      content: item.summary || 'No content available',
      source: {
        id: item.news_site,
        name: item.news_site,
      },
      author: item.news_site,
    }));

    return {
      status: 'ok',
      totalResults: data.count,
      articles,
    };
  } catch (error) {
    console.error('Error fetching real news from API:', error);
    // Return empty state if the network fails completely
    return {
      status: 'error',
      totalResults: 0,
      articles: [],
    };
  }
};
