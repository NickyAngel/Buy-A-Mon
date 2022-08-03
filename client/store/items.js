import axios from "axios";

let initialState = [];

let SET_ITEMS = "SET_ITEMS";
let DELETE_ITEM = "DELETE_ITEM";
let UPDATE_ITEM = "UPDATE_ITEM";
let ADD_ITEM = "ADD_ITEM";

//ACTION CREATOR: SET ALL ITEMS
export const setAllItems = (items) => {
  return {
    type: SET_ITEMS,
    items,
  };
};
//THUNK: GRAB ALL ITEMS
export const fetchAllItems = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/items/');
      dispatch(setAllItems(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//ADD ITEM (ADMINISTRATOR)
export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    item,
  };
};
//THUNK ADD ITEM (ADMINISTRATOR)
export const createitem = (item) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/items/:id/create/`, item);
      dispatch(addItem(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//UPDATE ITEM (ADMINISTRATOR)
export const reformItem = (item) => {
  return {
    type: UPDATE_ITEM,
    item,
  };
};
//THUNK: PUT REQUEST
export const updateItem = (item) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/items/${item.id}/`, item);
    dispatch(reformItem(data));
  };
};

//ACTION CREATOR: REMOVE A ITEM
export const removeItem = (id) => {
  return {
    type: DELETE_ITEM,
    id,
  };
};
//THUNK: DELETE REQUEST
export const deleteItem = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/items/${id}/`);
      dispatch(removeItem(id));
    } catch (err) {
      console.log(err);
    }
  };
};

//REDUCER
export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items;
    case ADD_ITEM:
      return [...state, action.item];
    case UPDATE_ITEM:
      return state.map((Item) =>
        Item.id === action.Item.id ? action.Item : Item
      );
    case DELETE_ITEM:
      return state.filter((Item) => Item.id !== action.id);
    default:
      return state;
  }
}
