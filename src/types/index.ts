export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export type RootStackParamList = {
  Home: undefined;
  Details: { article: NewsArticle };
  Bookmarks: undefined;
};
