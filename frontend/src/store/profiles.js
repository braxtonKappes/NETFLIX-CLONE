import { csrfFetch } from "./csrf.js";

const LOAD_ALL_PROFILES = 'profiles/LOAD_ALL_PROFILES';
const LOAD_ONE_PROFILE = 'profiles/LOAD_ONE_PROFILE';
const LOAD_ONE_PROFILE_TO_EDIT = 'profiles/LOAD_ONE_PROFILE_TO_EDIT'
const ADD_PROFILE = 'profiles/ADD_PROFILE'
const REMOVE_PROFILE = 'profiles/REMOVE_PROFILE'
const EDIT_PROFILE = 'profiles/EDIT_PROFILE'
const CLEAR_PROFILES_STATE = 'profiles/CLEAR_PROFILES_STATE'
const CLEAR_CURRENT_PROFILE_STATE = 'profiles/CLEAR_CURRENT_PROFILE_STATE'
const CLEAR_CURRENT_EDIT_PROFILE_STATE = 'profiles/CLEAR_CURRENT_EDIT_PROFILE_STATE'

// actions
const loadAll = (profiles) => ({
    type: LOAD_ALL_PROFILES,
    profiles
})

const loadOne = (profile) => ({
    type: LOAD_ONE_PROFILE,
    profile
})

const loadOneToEdit = (profile) => ({
    type: LOAD_ONE_PROFILE_TO_EDIT,
    profile
})

const createProfile = (profile) => ({
    type: ADD_PROFILE,
    profile
});

const removeProfile = (profileId) => ({
    type: REMOVE_PROFILE,
    profileId
});

const editAProfile = (updatedProfile) => ({
    type: EDIT_PROFILE,
    updatedProfile
});

const clearAllProfilesState = () => ({
    type: CLEAR_PROFILES_STATE,
});

const clearCurrentProfileStateAction = () => ({
    type: CLEAR_CURRENT_PROFILE_STATE
})

const clearCurrentEditProfileStateAction = () => ({
    type: CLEAR_CURRENT_EDIT_PROFILE_STATE
})

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

// Get one profile to edit
export const loadOneProfileToEdit = (profileId) => async (dispatch) => {
    const res = await csrfFetch(`/api/profiles/one/${profileId}`);
    if (res.ok) {
        const profile = await res.json();
        dispatch(loadOneToEdit(profile))
    }
}

// Add a profile
export const addProfile = (data) => async (dispatch) => {
    const res = await csrfFetch(`/api/profiles`, {
        method: `POST`,
        body: JSON.stringify(data)
    });
    if (res.ok) {
        const profileData  = await res.json();
        dispatch(createProfile(profileData));
        return profileData;
    }
}

// Delete a profile
export const delProfile = (profileId) => async (dispatch) => {
    const res = await csrfFetch(`/api/profiles/${profileId}`, {
        method: `DELETE`,
    });
    if (res.ok) {
        const profileId = await res.json();
        dispatch(removeProfile(profileId))
        return profileId;
    }
}

// Edit a profile
export const editProfile = (data) => async (dispatch) => {
    const res = await csrfFetch(`/api/profiles`, {
        method: "PUT",
        body: JSON.stringify(data),
    })
    if (res.ok) {
        const updatedProfile = await res.json()
        dispatch(editAProfile(updatedProfile))
        return updatedProfile;
    }
}

// Clear ALL profile state
export const clearAllProfileState = () => async (dispatch) => {
    dispatch(clearAllProfilesState())
}

// Clear current profile
export const clearCurrentProfileState = () => async (dispatch) => {
    dispatch(clearCurrentProfileStateAction())
}

// Clear current profile
export const clearCurrentEditProfileState = () => async (dispatch) => {
    dispatch(clearCurrentEditProfileStateAction())
}

// Reducer
const profilesReducer = (state={
    currentProfile: {},
    editProfile: {},
    allProfiles: {}
    }, action) => {
    let newState = {...state};
    switch (action.type) {
        case LOAD_ALL_PROFILES: {
            action.profiles.forEach(profile => {
                newState.allProfiles[profile.id] = profile;
            });
            return newState;
        }
        case LOAD_ONE_PROFILE_TO_EDIT: {
            newState.editProfile = action.profile
            return newState;
        }
        case LOAD_ONE_PROFILE: {
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
        case CLEAR_PROFILES_STATE: {
            newState.allProfiles = {}
            newState.currentProfile = {}
            return newState;
        }
        case CLEAR_CURRENT_PROFILE_STATE: {
            newState.currentProfile = {}
            return newState
        }
        case CLEAR_CURRENT_EDIT_PROFILE_STATE: {
            newState.editProfile = {}
            return newState
        }
        default: {
            return state;
        }
    }
}

export default profilesReducer;
