import { Post } from "@/types";
import {
  ADD_ITEM,
  DELETE_ITEM,
  ITEM_ERROR,
  ITEM_LOADING,
  SET_ITEM_LIST,
  UPDATE_ITEM
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

const itemReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ITEM_LOADING:
      return { ...state, loading: false, error: null };
    case SET_ITEM_LIST:
      return { ...state, loading: false, items: action.payload };
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload)
      };
    case ITEM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default itemReducer;
