import './ManageProfiles.css'
import React, { useEffect, useState } from 'react'
import * as profileActions from '../../store/profiles'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import EditDeleteProfile from '../EditDeleteProfile/EditDeleteProfile'
import edit_pencil_icon from '../../imgs/edit-pencil.svg'

function ManageProfiles() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [showProfileToEdit, setShowProfileToEdit] = useState(false)
    const session = useSelector(state => state.session);
    const userId = session.user.id
    const profiles = useSelector(state => state.profiles)
    const allProfiles = profiles.allProfiles
    const editProfile = useSelector(state => state.profiles?.editProfile)

    useEffect(() => {
        const fetchProfiles = async () => {
            await dispatch(profileActions.clearCurrentProfileState())
            .then(dispatch(profileActions.loadAllProfiles(userId)))
            .then(setIsLoaded(true))
        }
        fetchProfiles();
    }, [dispatch, userId]);

    const handleOnClick = () => {
        setShowProfileToEdit(true)
    }


    if (Object.keys(editProfile).length && showProfileToEdit) {
        return (
            <EditDeleteProfile setShowProfileToEdit={setShowProfileToEdit} />
        )
    } else {
        return isLoaded && (
            <div className="manage-profiles-wrapper">
                <h1 className="manage-profiles-title">Manage Profiles</h1>
                <div className="manage-profiles-content">
                    <div className="manage-profiles">
                        {Object.values(allProfiles).map(profile => (
                            <div className="manage-profile" onClick={() => dispatch(profileActions.loadOneProfileToEdit(profile.id)).then(handleOnClick)} key={profile.id}>
                                <div className="manage-profile-icon-container">
                                    <img
                                        className='edit-pencil-icon'
                                        src={edit_pencil_icon}
                                        alt="edit-pencil-icon" />
                                    <img
                                        className="manage-profile-icon"
                                        src={profile.icon}
                                        alt="profile-icon"
                                    />
                                </div>
                                <div className="profile-name-container">
                                    <h2 className="manage-profile-name">{profile.name}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to={'/browse'} className="manage-profiles-done-btn">Done</Link>
                </div>
            </div>
        )
    }
}

export default ManageProfiles
