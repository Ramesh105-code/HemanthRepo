// src/features/products/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const controllers = {};

export const fetchProductsPage = createAsyncThunk(
  'products/fetchProductsPage',
  async (pageIndex, { getState, signal, rejectWithValue }) => {
    const { products } = getState();

    
    if (products.pages[pageIndex]) {
      return { pageIndex, products: products.pages[pageIndex], cached: true };
    }
    if (controllers[pageIndex]) {
      controllers[pageIndex].abort();
    }

    // Create new AbortController
    const controller = new AbortController();
    controllers[pageIndex] = controller;

    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${pageIndex * 10}`,
        { signal: controller.signal }
      );

      if (!res.ok) throw new Error('Failed to fetch products');

      const data = await res.json();

      return { pageIndex, products: data.products };
    } catch (err) {
      if (err.name === 'AbortError') return rejectWithValue('Request cancelled');
      return rejectWithValue(err.message || 'Something went wrong');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    pages: {}, 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsPage.fulfilled, (state, action) => {
        state.loading = false;
        const { pageIndex, products, cached } = action.payload;
        if (!cached) {
          state.pages[pageIndex] = products;
        }
      })
      .addCase(fetchProductsPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default productsSlice.reducer;
