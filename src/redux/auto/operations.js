import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getFilteredParams } from "../../utils.js";

export const fetchAuto = createAsyncThunk(
  "auto/fetchAuto",
  async ({ page = 1, limit = 12, append = false } = {}, thunkAPI) => {
    try {
      const filters = thunkAPI.getState().filters;
      /*const params = {
        page,
        limit,
        brand: filters.brand,
        rentalPrice: filters.rentalPrice,
        minMileage: filters.minMileage,
        maxMileage: filters.maxMileage,
      };*/

      const params = {
        page,
        limit,
        ...getFilteredParams(filters),
      };
      const response = await axios.get(
        "https://car-rental-api.goit.global/cars",
        { params }
      );

      return {
        items: response.data.cars,
        totalItems: response.data.totalItems,
        append,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка при завантаженні машин"
      );
    }
  }
);

export const toggleFavoriteAutoAsync = createAsyncThunk(
  "auto/toggleFavoriteAsync",
  async ({ autoId }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const favoriteIds = state.auto.favorites;
      const isFavorite = favoriteIds.includes(autoId);

      return { autoId, add: !isFavorite };
    } catch (error) {
      return thunkAPI.rejectWithValue("Помилка при зміні улюблених авто");
    }
  }
);
