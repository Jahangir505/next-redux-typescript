import { Post } from "@/types";
import axios from "axios";

const API_URL = "https://dummyjson.com/posts";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// Fetch Items
export const fetchItems = () => async (dispatch: any) => {
  dispatch({ type: "ITEM_LOADING" });
  try {
    const response = await axios.get(API_URL);
    console.log("response=======", response.data.posts);

    dispatch({ type: "SET_ITEM_LIST", payload: response.data.posts });
  } catch (error) {
    dispatch({ type: "ITEM_ERROR", payload: error });
  }
};

// Add Item
export const addItem = (item: Post) => async (dispatch: any) => {
  dispatch({ type: "ITEM_LOADING" });
  try {
    const formData = new FormData();
    formData.append("title", item.title);
    formData.append("body", item?.body ?? "");
    formData.append("userId", "1");

    const response = await axios.post(`${API_URL}/add`, formData);
    // console.log("response=======", response);

    dispatch({ type: "ADD_ITEM", payload: formData });
  } catch (error) {
    dispatch({ type: "ITEM_ERROR", payload: error });
  }
};

// Update Item
export const updateItem =
  (updatedItem: Post, id: number) => async (dispatch: any) => {
    dispatch({ type: "ITEM_LOADING" });
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedItem);
      const data = await response.data;
      dispatch({ type: "UPDATE_ITEM", payload: data });
    } catch (error) {
      dispatch({ type: "ITEM_ERROR", payload: error });
    }
  };

// Delete Item
export const deleteItem = (id: number) => async (dispatch: any) => {
  dispatch({ type: "ITEM_LOADING" });
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({ type: "DELETE_ITEM", payload: id });
  } catch (error) {
    dispatch({ type: "ITEM_ERROR", payload: error });
  }
};
