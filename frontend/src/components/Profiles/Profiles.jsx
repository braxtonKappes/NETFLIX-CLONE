import React, { useEffect, useState } from 'react'
import * as profileActions from '../../store/profiles'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Profiles.css'

function Profiles() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    // const [selectedProfileId, setSelectedProfileId] = useState('');
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        const fetchProfiles = async () => {
            // await dispatch(profileActions.loadAllProfiles(user?.id))
            setIsLoaded(true)
        }
        fetchProfiles();
    });





    return isLoaded && (
        <div className='profiles-container'>
            <div className="list-profiles-wrapper">
                <div className="list-profiles">
                    <h1 className="whos-watching">Who's watching?</h1>
                    <ul className="choose-profile">
                        {/* map profiles here */}
                        {/* await dispatch(profileActions.loadOneProfile()) */}
                    </ul>
                </div>
                <Link exact to={'/profiles/manage'} className="manage-profiles-button">Manage Profiles</Link>
            </div>
        </div>
    )
}

export default Profiles
