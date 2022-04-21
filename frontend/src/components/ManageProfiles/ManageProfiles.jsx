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
    const user = useSelector(state => state.session?.user);
    const profiles = useSelector(state => Object.values(state.profiles?.allProfiles))
    const editProfile = useSelector(state => state.profiles?.editProfile)

    useEffect(() => {
        const fetchProfiles = async () => {
            await dispatch(profileActions.loadAllProfiles(user.id))
            setIsLoaded(true)
        }
        fetchProfiles();
    }, [dispatch, user.id]);

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
                <div className="manage-profiles-content">
                <h1 className="manage-profiles-title">Manage Profiles</h1>
                <div className="manage-profiles">
                    {profiles?.map(profile => (
                        <div key={profile.id} className="manage-profile">
                            <div className="manage-profile-icon-container">
                                <img
                                onClick={() => dispatch(profileActions.loadOneProfileToEdit(profile.id)).then(handleOnClick)}
                                className='edit-pencil-icon'
                                src={edit_pencil_icon}
                                alt="edit-pencil-icon" />
                                <img
                                    src={profile.icon}
                                    alt="profile-icon"
                                    className="manage-profile-icon"
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
