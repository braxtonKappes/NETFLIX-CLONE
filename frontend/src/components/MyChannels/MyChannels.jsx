import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './MyChannels.css'
import * as myChannelsActions from '../../store/myChannels'
import { useParams } from 'react-router-dom'

function MyChannels() {
    const { profileId } = useParams();
    const dispatch = useDispatch();
    const session = useSelector(state => state.session);
    const userId = session.user.id

    useEffect(() => {
        dispatch(myChannelsActions.loadAllChannels(profileId));
    }, [dispatch, profileId])

    return (
        <div className='mc-wrapper'>
            <div className="mc-body">
                <div className="mc-content">

                </div>
            </div>
        </div>
    )
}

export default MyChannels
