import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../Banner/Banner'
import MovieRows from '../MovieRows/MovieRows'
import Profiles from '../Profiles/Profiles'
import * as myChannelsActions from '../../store/myChannels'

function BrowseParent() {
    const dispatch = useDispatch();
    const profiles = useSelector(state => state.profiles);
    const currentProfile = profiles.currentProfile;
    const currentProfileId = profiles.currentProfile.id;

    useEffect(() => {
        dispatch(myChannelsActions.clearAllChannelState())

    }, [dispatch])


    if (Object.keys(currentProfile).length) {
        return (
            <>
                <Banner currentProfileId={currentProfileId}/>
                <MovieRows />
            </>
        )
    } else {
        return (
            <>
                <Profiles />
            </>
        )
    }

}

export default BrowseParent
