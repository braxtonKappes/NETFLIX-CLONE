import React from 'react'
import { useSelector } from 'react-redux';
import Banner from '../Banner/Banner'
import MovieRows from '../MovieRows/MovieRows'
import Profiles from '../Profiles/Profiles'

function BrowseParent() {
    const profiles = useSelector(state => state.profiles);
    const currentProfile = profiles.currentProfile;
    const currentProfileId = profiles.currentProfile.id;

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
