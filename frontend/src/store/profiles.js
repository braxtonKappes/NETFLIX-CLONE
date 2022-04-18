import { csrfFetch } from "./csrf.js";

const LOAD_ALL = 'profile/LOAD_ALL';
const LOAD_ONE = 'profile/LOAD_ONE'

// actions
const loadAll = (profiles) => ({
    type: LOAD_ALL,
    profiles
})

const loadOne = (profile) => ({
    type: LOAD_ONE,
    profile
})

// thunks
export const loadAllProfiles = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/profiles/all/${userId}`)

    if (res.ok) {
        const profiles = await res.json();
        dispatch(loadAll(profiles));
    }
}

export const loadOneProfile = (profileId) => async (dispatch) => {
    const res = await csrfFetch(`/api/profiles/one/${profileId}`);

    if (res.ok) {
        const profile = await res.json();
        dispatch(loadOne(profile))
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
            action.currentProfile = action.profile
            return newState;
        }
        default:
            return state;
    }
}

export default profilesReducer;
