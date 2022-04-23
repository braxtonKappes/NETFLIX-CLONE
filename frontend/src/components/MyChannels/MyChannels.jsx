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
    const [count, setCount] = useState(0)
    const session = useSelector(state => state.session);
    const myChannels = useSelector(state => state.myChannels);
    const allChannels = myChannels.allChannels
    const userId = session.user.id

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        await dispatch(myChannelsActions.addChannel({profileId: profileId, name: note}))
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
                        <form onSubmit={handleOnSubmit} action='submit' className="add-a-note-form">
                            <div className="textarea-counter">{count}/250</div>
                            <textarea
                                type="text"
                                className="note-input"
                                placeholder='Write a reminder to watch a movie!'
                                value={note}
                                onChange={(e) => {setNote(e.target.value); setCount(e.target.value.length)}}
                                minLength='1'
                                maxLength='250'
                                required
                            />
                            <button className="add-note-add-btn">Add</button>
                        </form>
                    </div>
                    {Object.values(allChannels).map(channel => (
                        <div className="channel-container">
                            
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default MyChannels
