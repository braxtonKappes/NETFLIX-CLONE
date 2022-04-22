import { csrfFetch } from "./csrf.js";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

// actions
const setUser = (user) => ({
  type: SET_USER,
  user
});

const removeUser = () => ({
  type: REMOVE_USER,
});

// Login user
export const login = (user) => async dispatch => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify(user),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

// Restore user
export const restoreUser = () => async dispatch => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data));
  return data;
};

// Signup new user
export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// Logout user
export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

function reducer(state={
  user: {},
  },action) {
  let newState = {...state};
  switch (action.type) {
      case SET_USER:
        newState.user = action.user;
        return newState;
      case REMOVE_USER:
        newState = {user: {}};
        return newState;
      default:
        return state;
  }
}

export default reducer;
