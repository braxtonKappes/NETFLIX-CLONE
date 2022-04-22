import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './MyChannels.css'
import * as myChannelsActions from '../../store/myChannels'

function MyChannels() {
    const dispatch = useDispatch();
    const profileId = useSelector(state => state.profiles.currentProfile?.id)

    useEffect(() => {
        dispatch(myChannelsActions.loadAllChannels(profileId))

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
