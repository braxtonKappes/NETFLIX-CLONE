import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './MyChannels.css'
import * as myChannelsActions from '../../store/myChannels'
import * as profileActions from '../../store/profiles'
import { useParams } from 'react-router-dom'

function MyChannels() {
    const dispatch = useDispatch();
    const { profileId } = useParams();
    const [note, setNote] = useState('')
    const [count, setCount] = useState(0);
    const [errors, setErrors] = useState([]);
    const [errorsEdit, setErrorsEdit] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentlyEditing, setCurrentlyEditing] = useState(false)
    const session = useSelector(state => state.session);
    const myChannels = useSelector(state => state.myChannels);
    const allChannels = myChannels.allChannels
    const editChannelId = myChannels.editChannel.id
    const userId = session.user.id
    const [editNote, setEditNote] = useState('')

    const handleAddOnSubmit = async (e) => {
        e.preventDefault()
        if (!note) return setErrors(['Please write a note between 1 - 250 characters.'])
        if (!note.trim()) return setErrors(['Please avoid white spaces at the beginning of your note!'])
        await dispatch(myChannelsActions.addChannel({profileId: profileId, name: note}))
        .then(setNote(''))
        .catch(
            async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
            }
        );
    }

    const handleEditShowChannel = async (channelId, channelName) => {
        await dispatch(myChannelsActions.loadOneChannelToEdit(channelId))
        .then(setEditNote(channelName))
        .then(setIsLoaded(true))
        .then(setCurrentlyEditing(true))
    }

    const handleEditSubmit = async (channelId, name) => {
        if (!editNote) return setErrorsEdit(['Please write a note between 1 - 250 characters.'])
        if (!editNote.trim()) return setErrorsEdit(['Please avoid white spaces at the beginning of your note!'])

        await dispatch(myChannelsActions.editChannel({channelId: channelId, name: name}))
        .then(dispatch(myChannelsActions.clearCurrentEditChannelState()))
        .then(setCurrentlyEditing(false))
        .then(setIsLoaded(false))
        .catch(
            async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrorsEdit(data.errors);
            }
        );
    }

    const cancelEdit = async () => {
        await dispatch(myChannelsActions.clearCurrentEditChannelState())
        .then(setCurrentlyEditing(false))
        .then(setIsLoaded(false))

    }

    useEffect(() => {
        dispatch(profileActions.loadOneProfile(profileId))
        .then(() => dispatch(profileActions.loadAllProfiles(userId)))
        .then(() => dispatch(myChannelsActions.loadAllChannels(profileId)))
    }, [dispatch, profileId, userId])

    const filteredErrors = errors.filter(error => error !== 'Invalid value')
    const filteredErrorsEdit = errorsEdit.filter(error => error !== 'Invalid value')

    return (
        <div className='mc-wrapper'>
            <div className="mc-content">
                <div className="mc-title-container">
                    <h1 className="mc-title">My Notes</h1>
                </div>
                <div className="add-a-note-form-container">
                    <ul className={filteredErrors.length > 0 ? "errorList" : "hideErrorList"}>
                        {filteredErrors.map((error, idx) =>
                        <li key={idx}>
                            {error}
                        </li>)}
                    </ul>
                    <h2 className="add-a-note-subtitle">Add a note!</h2>
                    <form onSubmit={handleAddOnSubmit} action='submit' className="add-a-note-form">
                        <div className="textarea-counter">{count}/250</div>
                        <textarea
                            type="text"
                            className="note-input"
                            placeholder='Write a reminder to watch a movie!'
                            value={note}
                            onChange={(e) => {setNote(e.target.value); setCount(e.target.value.length)}}
                            minLength='1'
                            maxLength='250'
                        />
                        <button className="add-note-add-btn">Add</button>
                    </form>
                </div>
                <div className="channel-container">
                {Object.values(allChannels).reverse().map(channel => (
                    <div key={channel.id} className="mc-note-container">
                        {editChannelId === channel.id && isLoaded && (
                        <div className="edit-show-stuff">
                            <ul className={filteredErrorsEdit.length > 0 ? "errorList" : "hideErrorList"}>
                            {filteredErrorsEdit.map((error, idx) =>
                                <li key={idx}>
                                    {error}
                                </li>)}
                            </ul>
                            <textarea
                            className="mc-edit-input"
                            type="text"
                            minLength='1'
                            maxLength='250'
                            value={editNote}
                            onChange={(e) => setEditNote(e.target.value)}
                            />
                            <div className="mc-btn-container">
                                <button onClick={() => handleEditSubmit(channel.id, editNote)} className="mc-edit-btn">Save</button>
                                <button onClick={() => cancelEdit()} className="mc-delete-btn">Cancel</button>
                            </div>
                        </div>
                        )}
                        {editChannelId !== channel.id && (
                        <div className="edit-show-stuff">
                            <div className="mc-note">
                                {channel.name}
                            </div>
                            {!currentlyEditing && (
                                <div className="mc-btn-container">
                                    <button onClick={() => handleEditShowChannel(channel.id, channel.name)} className="mc-edit-btn">Edit</button>
                                    <button onClick={() => dispatch(myChannelsActions.delChannel(channel.id))} className="mc-delete-btn">Delete</button>
                                </div>
                            )}
                        </div>
                        )}
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyChannels
