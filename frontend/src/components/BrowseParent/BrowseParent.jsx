import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Banner from '../Banner/Banner'
import MovieRows from '../MovieRows/MovieRows'
import Profiles from '../Profiles/Profiles'

function BrowseParent() {
    const user = useSelector(state => state.session?.user)
    const profile = useSelector(state => state.profiles?.currentProfile);

    // if (Object.keys(session).length) {
    //     return (
    //         <Redirect exact to='/' />
    //     )
    // } else
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
