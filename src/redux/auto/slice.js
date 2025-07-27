import { createSlice } from "@reduxjs/toolkit";
import { fetchAuto, toggleFavoriteAutoAsync } from "./operations.js";

const initialState = {
  items: [],
  totalItems: 0,
  favorites: [],
  loading: false,
  error: null,
  notFound: false,
};

const autoSlice = createSlice({
  name: "auto",
  initialState,
  reducers: {
    toggleFavoriteAuto: (state, action) => {
      const { id, add } = action.payload;
      const auto = state.items.find((r) => r.id === id);
      if (auto) {
        auto.isFavorite = add;
      }
    },

    clearNotFound: (state) => {
      state.notFound = false;
    },

    clearAuto: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.notFound = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAuto.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.notFound = false;
      })

      .addCase(fetchAuto.fulfilled, (state, action) => {
        const { items, totalItems, append } = action.payload;

        state.items = append
          ? [
              ...state.items,
              ...items.filter(
                (item) => !state.items.find((r) => r.id === item.id)
              ),
            ]
          : items;

        state.totalItems = totalItems;
        state.loading = false;
        state.notFound = items.length === 0;
      })
      .addCase(fetchAuto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(toggleFavoriteAutoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(toggleFavoriteAutoAsync.fulfilled, (state, action) => {
        const { autoId, add } = action.payload;
        if (add) {
          state.favorites.push(autoId);
        } else {
          state.favorites = state.favorites.filter((id) => id !== autoId);
        }
        state.loading = false;
      })
      .addCase(toggleFavoriteAutoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { toggleFavoriteAuto, clearNotFound, clearAuto } =
  autoSlice.actions;

export const autoReducer = autoSlice.reducer;
