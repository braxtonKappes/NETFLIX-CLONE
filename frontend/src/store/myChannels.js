import { csrfFetch } from "./csrf.js";

const LOAD_ALL_CHANNELS = 'channels/LOAD_ALL_CHANNELS';
const LOAD_ONE_CHANNEL = 'channels/LOAD_ONE_CHANNEL';
const LOAD_ONE_CHANNEL_TO_EDIT = 'channels/LOAD_ONE_CHANNEL_TO_EDIT'
const ADD_CHANNEL = 'channels/ADD_CHANNEL'
const REMOVE_CHANNEL = 'channels/REMOVE_CHANNEL'
const EDIT_CHANNEL = 'channels/EDIT_CHANNEL'
const CLEAR_CHANNELS_STATE = 'channels/CLEAR_CHANNELS_STATE'
const CLEAR_CURRENT_CHANNEL_STATE = 'channels/CLEAR_CURRENT_CHANNEL_STATE'
const CLEAR_CURRENT_EDIT_CHANNEL_STATE = 'channels/CLEAR_CURRENT_EDIT_CHANNEL_STATE'

// actions
const load_All_Channels = (channels) => ({
    type: LOAD_ALL_CHANNELS,
    channels
});

const load_One_Channel = (channel) => ({
    type: LOAD_ONE_CHANNEL,
    channel
});

const loadOneToEditChannel = (channel) => ({
    type: LOAD_ONE_CHANNEL_TO_EDIT,
    channel
});

const createChannel = (channel) => ({
    type: ADD_CHANNEL,
    channel
});

const removeChannel = (channelId) => ({
    type: REMOVE_CHANNEL,
    channelId
});

const editAChannel = (updatedChannel) => ({
    type: EDIT_CHANNEL,
    updatedChannel
});

const clearAllChannelsState = () => ({
    type: CLEAR_CHANNELS_STATE,
});

const clearCurrentChannelStateAction = () => ({
    type: CLEAR_CURRENT_CHANNEL_STATE
})

const clearCurrentEditChannelStateAction = () => ({
    type: CLEAR_CURRENT_EDIT_CHANNEL_STATE
})

/* thunks */
// Get all channels and movies
export const loadAllChannels = (profileId) => async (dispatch) => {
    const res = await csrfFetch(`/api/channels/all/${profileId}`)
    if (res.ok) {
        const channels = await res.json();
        dispatch(load_All_Channels(channels));
        return channels;
    }
    return res;
}

// Get one channel
export const loadOneChannel = (channelId) => async (dispatch) => {
    const res = await csrfFetch(`/api/channels/one/${channelId}`);
    if (res.ok) {
        const channel = await res.json();
        dispatch(load_One_Channel(channel))
    }
    return res;
}

// Get one channel to edit
export const loadOneChannelToEdit = (channelId) => async (dispatch) => {
    const res = await csrfFetch(`/api/channels/one/${channelId}`);
    if (res.ok) {
        const channel = await res.json();
        dispatch(loadOneToEditChannel(channel))
    }
    return res;
}

// Add a channel
export const addChannel = (data) => async (dispatch) => {
    const res = await csrfFetch(`/api/channels`, {
        method: `POST`,
        body: JSON.stringify(data)
    });
    if (res.ok) {
        const channelData  = await res.json();
        dispatch(createChannel(channelData));
        return channelData;
    }
}

// Delete a channel
export const delChannel = (channelId) => async (dispatch) => {
    const res = await csrfFetch(`/api/channels`, {
        method: `DELETE`,
        body: JSON.stringify({channelId}),
    });
    if (res.ok) {
        const channelId = await res.json();
        dispatch(removeChannel(channelId));
        return channelId;
    }
    return res;
}

// Edit a channel
export const editChannel = (data) => async (dispatch) => {
    const res = await csrfFetch(`/api/channels`, {
        method: "PUT",
        body: JSON.stringify(data),
    })
    if (res.ok) {
        const updatedChannel = await res.json()
        dispatch(editAChannel(updatedChannel))
        return updatedChannel;
    }
    return res;
}

// Clear ALL channel state
export const clearAllChannelState = () => async (dispatch) => {
    dispatch(clearAllChannelsState())
}

// Clear current channel
export const clearCurrentChannelState = () => async (dispatch) => {
    dispatch(clearCurrentChannelStateAction())
}

// Clear current edit channel
export const clearCurrentEditChannelState = () => async (dispatch) => {
    dispatch(clearCurrentEditChannelStateAction())
}

// Reducer
const channelsReducer = (state={
    currentChannel: {},
    editChannel: {},
    allChannels: {}
    }, action) => {
    let newState = {...state};
    switch (action.type) {
        case LOAD_ALL_CHANNELS: {
            action.channels.forEach(channel => {
                newState.allChannels[channel.id] = channel;
            });
            return newState;
        }
        case LOAD_ONE_CHANNEL_TO_EDIT: {
            newState.editChannel = action.channel
            return newState;
        }
        case LOAD_ONE_CHANNEL: {
            newState.currentChannel = action.channel
            return newState;
        }
        case ADD_CHANNEL: {
            newState.allChannels[action.channel.id] = action.channel
            return newState;
        }
        case EDIT_CHANNEL: {
            newState.allChannels[action.updatedChannel.id] = action.updatedChannel
            return newState;
        }
        case REMOVE_CHANNEL: {
            delete newState.allChannels[action.channelId]
            return newState;
        }
        case CLEAR_CHANNELS_STATE: {
            newState.allChannels = {}
            newState.currentChannel = {}
            return newState;
        }
        case CLEAR_CURRENT_CHANNEL_STATE: {
            newState.currentChannel = {}
            return newState;
        }
        case CLEAR_CURRENT_EDIT_CHANNEL_STATE: {
            newState.editChannel = {}
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default channelsReducer;
