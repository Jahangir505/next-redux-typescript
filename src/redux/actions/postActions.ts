import { Post } from "@/types";
import axios from "axios";
import Swal from "sweetalert2";
import {
  ADD_POST,
  DELETE_POST,
  POST_ERROR,
  POST_LOADING,
  SET_POST_LIST,
  UPDATE_POST
} from "./actionTypes";

// const API_URL = "https://dummyjson.com/posts"; // dummyjson
const API_URL = "https://jsonplaceholder.typicode.com/posts"; // jsonplaceholder
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// Fetch Items
export const fetchPosts = () => async (dispatch: any) => {
  dispatch({ type: POST_LOADING });
  try {
    const response = await axios.get(`${API_URL}?sortBy=id&order=desc`);
    console.log("response=======", response.data);

    dispatch({ type: SET_POST_LIST, payload: response.data });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: error });
  }
};

// Add Item
export const addPost = (post: Post) => async (dispatch: any) => {
  dispatch({ type: POST_LOADING });
  try {
    const formData = {
      title: post.title,
      body: post.body,
      userId: 187
    };
    const response = await axios.post(`${API_URL}`, formData);
    // console.log("response=======", response);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Added Successfully",
        showConfirmButton: false,
        timer: 1500
      });
    }
    dispatch({ type: ADD_POST, payload: response.data });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: error });
  }
};

// Update Item
export const updatePost =
  (updatedItem: Post, id: number) => async (dispatch: any) => {
    dispatch({ type: POST_LOADING });
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedItem);
      console.log("response=======", response);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Updated Successfully",
          showConfirmButton: false,
          timer: 1500
        });
      }

      const data = await response.data;
      dispatch({ type: UPDATE_POST, payload: data });
    } catch (error) {
      dispatch({ type: POST_ERROR, payload: error });
    }
  };

// Delete Item
export const deletePost = (id: number) => async (dispatch: any) => {
  dispatch({ type: POST_LOADING });
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/${id}`);
        dispatch({ type: DELETE_POST, payload: id });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: error });
  }
};
