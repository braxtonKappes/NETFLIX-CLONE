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
    const user = useSelector(state => state.session?.user);
    const profiles = useSelector(state => Object.values(state.profiles?.allProfiles))

    useEffect(() => {
        const fetchProfiles = async () => {
            await dispatch(profileActions.loadAllProfiles(user.id))
            setIsLoaded(true)
        }
        fetchProfiles();
    }, [dispatch, user.id]);

    if (showComponent) {
        return isLoaded && (
            <AddProfile setShowComponent={setShowComponent}/>
        )
    } else {
        return isLoaded && (
            <div className="profiles-wrapper">
                <h1 className="whos-watching">Who's watching?</h1>
                <div className="choose-profile">
                    {profiles?.map(profile => (
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
                {profiles.length < 5 && (
                    <div className="add-profile-button-container">
                        <button className='add-profile-button' onClick={() => setShowComponent(true)}>+</button>
                    </div>
                )}
                </div>
                <Link to={'/profiles/manage'} className="manage-profiles-button">Manage Profiles</Link>
            </div>
        )
    }
}

export default Profiles
