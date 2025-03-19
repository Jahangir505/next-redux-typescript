import { Post } from "@/types";
import {
  ADD_POST,
  DELETE_POST,
  POST_ERROR,
  POST_LOADING,
  SET_POST_LIST,
  SET_SELECTED_ITEM,
  UPDATE_POST
} from "../actions/actionTypes";

type InitialState = {
  items: Post[];
  loading: boolean;
  error: null | string;
  selectedItem: null;
};

const initialState: InitialState = {
  items: [],
  loading: false,
  error: null,
  selectedItem: null
};

const postReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case POST_LOADING:
      return { ...state, loading: true, error: null };
    case SET_POST_LIST:
      return { ...state, loading: false, items: action.payload };
    case SET_SELECTED_ITEM:
      return { ...state, selectedItem: action.payload };
    case ADD_POST:
      return {
        ...state,
        loading: false,
        items: [action.payload, ...state.items]
      };
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
