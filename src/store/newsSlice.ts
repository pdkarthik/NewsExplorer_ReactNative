import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { NewsArticle, NewsResponse } from '../types';
import { fetchTopHeadlines } from '../api/newsApi';

interface NewsState {
  articles: NewsArticle[];
  bookmarks: NewsArticle[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  searchQuery: string;
}

const initialState: NewsState = {
  articles: [],
  bookmarks: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  searchQuery: '',
};

export const getNews = createAsyncThunk(
  'news/getNews',
  async ({ page, query }: { page: number; query: string }) => {
    const response = await fetchTopHeadlines(page, 20, query);
    return response;
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    toggleBookmark: (state, action: PayloadAction<NewsArticle>) => {
      const index = state.bookmarks.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.bookmarks.splice(index, 1);
      } else {
        state.bookmarks.push(action.payload);
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.articles = [];
      state.page = 1;
      state.hasMore = true;
    },
    resetNews: (state) => {
      state.articles = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNews.fulfilled, (state, action: PayloadAction<NewsResponse>) => {
        state.loading = false;
        if (state.page === 1) {
          state.articles = action.payload.articles;
        } else {
          state.articles = [...state.articles, ...action.payload.articles];
        }
        state.hasMore = state.articles.length < action.payload.totalResults;
        state.page += 1;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news';
      });
  },
});

export const { toggleBookmark, setSearchQuery, resetNews } = newsSlice.actions;
export default newsSlice.reducer;
