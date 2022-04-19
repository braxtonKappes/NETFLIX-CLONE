import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../Banner/Banner'
import MovieRows from '../MovieRows/MovieRows'
import Profiles from '../Profiles/Profiles'
import * as profileActions from '../../store/profiles'

function BrowseParent() {
    const dispatch = useDispatch();
    // const userProfiles = useSelector(state => state.profiles?.allProfiles);
    const user = useSelector(state => state.session.user);
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
