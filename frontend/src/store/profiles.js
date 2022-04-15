import { csrfFetch } from "./csrf.js";

const LOAD_ALL = 'profile/LOAD_ALL';

// actions
const loadAll = (profiles) => ({
    type: LOAD_ALL,
    profiles
})


// thunks
export const loadAllProfiles = () => async (dispatch) => {
    const res = await csrfFetch(`/api/profiles`)

    if (res.ok) {
        const profiles = await res.json();
        dispatch(loadAll(profiles));
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
        default:
            return state;
    }
}

export default profilesReducer;
