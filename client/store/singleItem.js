import axios from "axios";
import itemsReducer from "./items";

const SET_SINGLE_ITEM = "SET_SINGLE_ITEM";
//const SEARCH_ITEM = 'SEARCH_ITEM'

export const setSingleItem = (ITEM) => {
  return {
    type: SET_SINGLE_ITEM,
    ITEM,
  };
};

export const fetchSingleItem = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/items/${id}`);
      dispatch(setSingleItem(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//// A POTENTIAL SEARCH FUNCTION BY ID
// export const searchItem = (Item) => {
//   return {
//     type: SEARCH_ITEM,
//     ITEM
//   }
// };

//   export const lookupItem = (state) => {
//       return async (dispatch) => {
//         try {
//           const {data} = await axios.get(`/api/items/${state.number}`)
//           dispatch(searchItem(data))
//         } catch (err) {
//           console.log(err)
//         }
//       }
//     }

let initialState = [];

const singleItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_ITEM:
      return action.ITEM;
    //   case SEARCH_ITEM:
    //     return  action.ITEM[0]

    default:
      return state;
  }
};

export default singleItemReducer;
