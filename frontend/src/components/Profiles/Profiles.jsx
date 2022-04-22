import React, { useEffect, useState } from 'react'
import * as profileActions from '../../store/profiles'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Profiles.css'
import AddProfile from '../AddProfile/AddProfile'

function Profiles() {
    const dispatch = useDispatch();
    const [showComponent, setShowComponent] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false);
    const session = useSelector(state => state.session);
    const userId = session.user.id
    const profiles = useSelector(state => state.profiles)
    const allProfiles = Object.values(profiles.allProfiles)

    useEffect(() => {
        const fetchProfiles = async () => {
        await dispatch(profileActions.loadAllProfiles(userId))
        setIsLoaded(true)
        }
        fetchProfiles();
    }, [dispatch, userId]);

    if (isLoaded && showComponent) {
        return (
            <AddProfile setShowComponent={setShowComponent}/>
        )
    } else {
        return isLoaded && (
            <div className="profiles-wrapper">
                <h1 className="whos-watching">Who's watching?</h1>
                <div className="choose-profile">
                    {allProfiles?.map(profile => (
                        <div key={profile.id} className="profile">
                            <div className="icon-container">
                                <img
                                onClick={() => dispatch(profileActions.loadOneProfile(profile.id))}
                                src={profile.icon}
                                alt="profile-icon"
                                className="profile-icon"
                                />
                            </div>
                            <div className="profile-name-container">
                                <h2 onClick={() => dispatch(profileActions.loadOneProfile(profile.id))} className="profile-name">{profile.name}</h2>
                            </div>
                        </div>
                    ))}
                {allProfiles.length < 5 && (
                    <div className="add-profile-button-container">
                        <button className='add-profile-button' onClick={() => setShowComponent(true)}>+</button>
                    </div>
                )}
                </div>
                {Object.keys(profiles.allProfiles).length > 0 && (
                    <Link to={'/profiles/manage'} className="manage-profiles-button">Manage Profiles</Link>
                )}
            </div>
        )
    }
}

export default Profiles
