import axios from 'axios';

let initialState = [];

let CREATE_ITEM = 'CREATE_ITEM';
let SET_ITEMS = 'SET_ITEMS';
let DELETE_ITEM = 'DELETE_ITEM';
let UPDATE_ITEM = 'UPDATE_ITEM';
let ADD_ITEM = 'ADD_ITEM';

//ACTION CREATOR: SET ALL ITEMS
export const setAllItems = items => {
  return {
    type: SET_ITEMS,
    items,
  };
};
//ACTION CREATOR: SET ALL ITEMS
export const createitem = items => {
  return {
    type: CREATE_ITEM,
    items,
  };
};

//THUNK: GRAB ALL ITEMS
export const fetchAllItems = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/items/');
      dispatch(setAllItems(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//ADD ITEM (ADMINISTRATOR)
export const addItem = item => {
  return {
    type: ADD_ITEM,
    item,
  };
};
//THUNK ADD ITEM (ADMINISTRATOR)
export const createItem = item => {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.post(
        `/api/items/create/`,
        { ...item },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(addItem(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//UPDATE ITEM (ADMINISTRATOR)
export const reformItem = item => {
  return {
    type: UPDATE_ITEM,
    item,
  };
};
//THUNK: PUT REQUEST
export const updateItem = (item, id) => {
  const token = window.localStorage.getItem('token');
  return async dispatch => {
    const { data } = await axios.put(
      `/api/items/${id}`,
      { ...item },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(reformItem(data));
  };
};

//ACTION CREATOR: REMOVE A ITEM
export const removeItem = id => {
  return {
    type: DELETE_ITEM,
    id,
  };
};
//THUNK: DELETE REQUEST
export const deleteItem = id => {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem('token');
      await axios.delete(`/api/items/${id}/`, {
        headers: {
          authorization: token,
        },
      });
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
      return action.item;
    case CREATE_ITEM:
      return [...state, action.campus];
    case DELETE_ITEM:
      return state.filter(Item => Item.id !== action.id);
    default:
      return state;
  }
}
