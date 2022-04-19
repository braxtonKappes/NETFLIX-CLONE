import { csrfFetch } from "./csrf.js";

const LOAD_ALL = 'profiles/LOAD_ALL';
const LOAD_ONE = 'profiles/LOAD_ONE';
const ADD_PROFILE = 'profiles/ADD_PROFILE'
const REMOVE_PROFILE = 'profiles/REMOVE_PROFILE'
const EDIT_PROFILE = 'profiles/EDIT_PROFILE'

// actions
const loadAll = (profiles) => ({
    type: LOAD_ALL,
    profiles
})

const loadOne = (profile) => ({
    type: LOAD_ONE,
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

// Reducer
const profilesReducer = (state={
    currentProfile: {},
    allProfiles: {}
    }, action) => {
    let newState = {...state};
    switch (action.type) {
        case LOAD_ALL: {
            action.profiles.forEach(profile => {
                newState.allProfiles[profile.id] = profile;
            });
            return newState;
        }
        case LOAD_ONE: {
            newState.currentProfile = action.profile
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
        default:
            return state;
    }
}

export default profilesReducer;
