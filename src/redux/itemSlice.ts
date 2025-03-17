import { createSlice } from "@reduxjs/toolkit";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

type Item = {
  id: number;
  name: string;
  description: string;
  image: string;
};

type ItemState = {
  items: Item[];
  loading: boolean;
  error: string | null;
};

const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
};




const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItem: (state, action) => {
      const { id, name, description, image } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
      }
    },
  },
});

export const { addItem, removeItem, updateItem } = itemSlice.actions;
export default itemSlice.reducer;
