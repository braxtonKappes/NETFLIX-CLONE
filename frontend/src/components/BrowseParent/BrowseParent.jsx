import React from 'react'
import { useSelector } from 'react-redux';
import Banner from '../Banner/Banner'
import MovieRows from '../MovieRows/MovieRows'
import Profiles from '../Profiles/Profiles'

function BrowseParent() {
    const profile = useSelector(state => state.profiles?.currentProfile);

    if (Object.keys(profile).length) {
        return (
            <>
                <Banner />
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
