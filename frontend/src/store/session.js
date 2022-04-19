import { csrfFetch } from "./csrf.js";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const LOAD_ALL_PROFILES = 'profiles/LOAD_ALL_PROFILES';
const LOAD_ONE_PROFILE = 'profiles/LOAD_ONE_PROFILE';
const ADD_PROFILE = 'profiles/ADD_PROFILE'
const REMOVE_PROFILE = 'profiles/REMOVE_PROFILE'
const EDIT_PROFILE = 'profiles/EDIT_PROFILE'

// actions
const setUser = (newUser) => ({
  type: SET_USER,
  newUser
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const loadAll = (profiles) => ({
    type: LOAD_ALL_PROFILES,
    profiles
})

const loadOne = (profile) => ({
    type: LOAD_ONE_PROFILE,
    profile
})

const addProfile = (profile) => ({
    type: ADD_PROFILE,
    profile
});

const removeProfile = (profileId) => ({
    type: REMOVE_PROFILE,
    profileId
});

const editProfile = (updatedProfile) => ({
    type: EDIT_PROFILE,
    updatedProfile
});

/* thunks */
// Get all profiles
export const loadAllProfiles = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/profiles/all/${userId}`)

    if (res.ok) {
        const profiles = await res.json();
        dispatch(loadAll(profiles));
    }
}

// Get one profile
export const loadOneProfile = (profileId) => async (dispatch) => {
    const res = await csrfFetch(`/api/profiles/one/${profileId}`);
    if (res.ok) {
        const profile = await res.json();
        dispatch(loadOne(profile))
    }
}

// Create a profile
export const createProfile = (data) => async (dispatch) => {
    const res = await csrfFetch(`/api/profiles`, {
        method: `POST`,
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const profileData  = await res.json();
        dispatch(addProfile(profileData.profile));
        return profileData;
    }
}

// Delete a spot
export const delProfile = (profileId) => async (dispatch) => {
    const res = await csrfFetch(`/api/profiles/${profileId}`, {
        method: `DELETE`,
        body: JSON.stringify({profileId}),
    });
    if (res.ok) {
        const profileId = await res.json();
        dispatch(removeProfile(profileId))
        return profileId;
    }
}

// Edit a profile
export const putProfile = (data) => async (dispatch) => {
    const res = await csrfFetch(`/api/profiles`, {
        method: "PUT",
        body: JSON.stringify(data),
    })
    if (res.ok) {
        const updatedProfile = await res.json()
        dispatch(editProfile(updatedProfile))
        return updatedProfile;
    }
}

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
  user: { profiles: { channels: { movies: {}}}},
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
