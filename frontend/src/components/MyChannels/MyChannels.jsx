import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './MyChannels.css'
import * as myChannelsActions from '../../store/myChannels'
import * as profileActions from '../../store/profiles'
import { useParams } from 'react-router-dom'

function MyChannels() {
    const { profileId } = useParams();
    const dispatch = useDispatch();
    const [note, setNote] = useState('')
    const session = useSelector(state => state.session);
    // const profiles = useSelector(state => state.profiles);
    const userId = session.user.id

    const handleOnSubmit = async () => {
        await dispatch(myChannelsActions.addChannel({profileId, note}))
    }

    useEffect(() => {
        dispatch(profileActions.loadOneProfile(profileId))
        .then(() => dispatch(profileActions.loadAllProfiles(userId)))
        .then(() => dispatch(myChannelsActions.loadAllChannels(profileId)))
    }, [dispatch, profileId, userId])

    return (
        <div className='mc-wrapper'>
                <div className="mc-content">
                    <div className="mc-title-container">
                        <h1 className="mc-title">My Notes</h1>
                    </div>
                    <div className="add-a-note-form-container">
                        <h2 className="add-a-note-subtitle">Add a note!</h2>
                        <form onSubmit={handleOnSubmit} className="add-a-note-form">
                            <textarea
                                type="text"
                                className="note-input"
                                placeholder='Write a reminder to watch a movie!'
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                minLength='1'
                                maxLength='250'
                                required
                            />
                            <button className="add-note-add-btn">Add</button>
                        </form>
                    </div>
                </div>
        </div>
    )
}

export default MyChannels
