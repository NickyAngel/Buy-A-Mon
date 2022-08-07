import axios from "axios";

let initialState = [];
let SET_USERS = "SET_USERS";

//action creator
export const setAllUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

//thunk
export const fetchAllUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/users/");
      dispatch(setAllUsers(data));
    } catch (e) {
      console.log(e);
    }
  };
};

//reducer

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
}
