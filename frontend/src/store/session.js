import { csrfFetch } from "./csrf.js";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

// Login user
export const login = ({ credential, password }) => async dispatch => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

// Restore user
export const restoreUser = () => async dispatch => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
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
<<<<<<< HEAD
  user: {

  },
=======
  user: { profiles: { channels: { movies: {}}}},
>>>>>>> e248f52f8f7613419521697eec4cac271734a007
  },action) {
  let newState = {...state};
  switch (action.type) {
    case LOAD_ALL_PROFILES: {
      action.profiles.forEach(profile => {
          newState.allProfiles[profile.id] = profile;
      });
      return newState;
    }
    case ADD_PROFILE: {
        newState.allProfiles[action.profile.id] = action.profile
        return newState;
    }
    case EDIT_PROFILE: {
        newState.allProfiles[action.updatedProfile.id] = action.updatedProfile
        return newState;
    }
    case REMOVE_PROFILE: {
        delete newState.allProfiles[action.profileId]
        return newState;
    }
      case SET_USER:
        newState.user = action.newUser;
        return newState;
      case REMOVE_USER:
        newState = Object.assign({}, state, { user: null });
        return newState;
      default:
        return state;
  }
}

export default reducer;
