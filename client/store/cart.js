import axios from "axios";

let initialState = [];

let SET_CART = "SET_CART";
let DELETE_CART = "DELETE_CART";
let UPDATE_CART = "UPDATE_CART";
let CLEAR_CART = "CLEAR_CART";
let ADD_CART = "ADD_CART";
let ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
let CLOSE_CART = 'CLOSE_CART';

//ACTION CREATOR: ADD ITEM TO CART
export const addItem = (item) => {
  return {
    type: ADD_ITEM_TO_CART,
    item,
  };
};

//THUNK: ADD ITEM TO CART
export const addItemToCart = (item, id) => {
  return async (dispatch) => {
    try {
      console.log(item);
      const { data } = await axios.post(`/api/users/${id}/cart`, item);
      console.log(data);
      dispatch(addItem(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//ACTION CREATOR: SET ALL CART
export const setCart = (CART) => {
  return {
    type: SET_CART,
    CART,
  };
};
//THUNK: GRAB ALL CART
export const fetchCart = id => {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.get(`/api/users/${id}/cart`, {
        headers: { authorization: token },
      });
      dispatch(setCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//UPDATE CART WITH ADDING/REMOVING ITEMS
export const reformCart = (CART) => {
  return {
    type: UPDATE_CART,
    CART,
  };
};
//THUNK: PUT REQUEST FOR ADDING/REMVING ITEMS
export const updateCart = (CART, id) => {
  return async dispatch => {
    const { data } = await axios.put(`/api/users/${id}/cart`, CART);
    dispatch(reformCart(data));
  };
};

//UPDATE CART WITH CLEARING CART
export const removeItem = CART => {
  return {
    type: CLEAR_CART,
    CART,
  };
};
//THUNK: DELETE REQUEST FOR CLEARING AN ITEM
export const clearItem = (itemId, userId) => {
  return async dispatch => {
    const { data } = await axios.delete(`/api/users/${userId}/cart/${itemId}`);
    dispatch(removeItem(data));
  };
};

//CLOSE ORDER ON CHECKOUT
export const endCart = CART => {
  return {
    type: CLOSE_CART,
    CART,
  };
};

//THUNK: PUT REQUEST FOR CLOSING ORDER
export const closeCart = id => {
  return async dispatch => {
    const { data } = await axios.put(`/api/users/${id}`);
    dispatch(endCart(data));
  };
};

//REDUCER
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return [...state, action.item];
    case SET_CART:
      return action.CART;
    // case ADD_CART:
    //   return [...state, action.CART];
    case UPDATE_CART:
      return action.CART;
    // return state.map(CART =>
    //   CART.id === action.CART.id ? action.CART : CART
    // );
    //[{a: 1}, {b:2}, {c:3}]
    //[{a:new}, {b:2}, {c:3}]
    case CLEAR_CART:
      return action.CART;
    // case DELETE_CART:
    //   return state.filter((CART) => CART.id !== action.id);
    case CLOSE_CART:
      return action.CART;
    default:
      return state;
  }
}

// //ADD TO CART
// export const addCART = (CART) => {
//     return {
//       type: ADD_CART,
//       CART,
//     };
//   };
//   //THUNK ADD CART
//   export const createCART = (CART) => {
//     return async (dispatch) => {
//       try {
//         const { data } = await axios.post(`/api/CART/:id/create/`, CART);
//         dispatch(addCART(data));
//       } catch (err) {
//         console.log(err);
//       }
//     };
//   };

// //ACTION CREATOR: REMOVE A CART
// export const removeCART = (id) => {
//     return {
//       type: DELETE_CART,
//       id,
//     };
//   };
//   //THUNK: DELETE REQUEST
//   export const deleteCART = (id) => {
//     return async (dispatch) => {
//       try {
//         await axios.delete(`/api/CART/${id}/`);
//         dispatch(removeCART(id));
//       } catch (err) {
//         console.log(err);
//       }
//     };
//   };
