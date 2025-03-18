import { Post } from "@/types";
import {
  ADD_POST,
  DELETE_POST,
  POST_ERROR,
  POST_LOADING,
  SET_POST_LIST,
  UPDATE_POST
} from "../actions/actionTypes";

type InitialState = {
  items: Post[];
  loading: boolean;
  error: null | string;
};

const initialState: InitialState = {
  items: [],
  loading: false,
  error: null
};

const postReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case POST_LOADING:
      return { ...state, loading: false, error: null };
    case SET_POST_LIST:
      return { ...state, loading: false, items: action.payload };
    case ADD_POST:
      return { ...state, items: [...state.items, action.payload] };
    case UPDATE_POST:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case DELETE_POST:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload)
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default postReducer;
