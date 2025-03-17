const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetch Items
export const fetchItems = () => async (dispatch: any) => {
  dispatch({ type: "ITEM_LOADING" });
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    dispatch({ type: "SET_ITEM_LIST", payload: data });
  } catch (error) {
    dispatch({ type: "ITEM_ERROR", payload: error });
  }
};

// Add Item
export const addItem = (item: any) => async (dispatch: any) => {
  dispatch({ type: "ITEM_LOADING" });
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    dispatch({ type: "ADD_ITEM", payload: data });
  } catch (error) {
    dispatch({ type: "ITEM_ERROR", payload: error });
  }
};

// Update Item
export const updateItem = (item: any) => async (dispatch: any) => {
  dispatch({ type: "ITEM_LOADING" });
  try {
    const response = await fetch(API_URL + `/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    dispatch({ type: "UPDATE_ITEM", payload: data });
  } catch (error) {
    dispatch({ type: "ITEM_ERROR", payload: error });
  }
};

// Delete Item
export const deleteItem = (id: number) => async (dispatch: any) => {
  dispatch({ type: "ITEM_LOADING" });
  try {
    await fetch(API_URL + `/${id}`, {
      method: "DELETE",
    });
    dispatch({ type: "DELETE_ITEM", payload: id });
  } catch (error) {
    dispatch({ type: "ITEM_ERROR", payload: error });
  }
};
