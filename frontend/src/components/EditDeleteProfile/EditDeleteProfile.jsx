import './EditDeleteProfile.css'
import React, { useState } from 'react'
import * as profileActions from '../../store/profiles'
import { useDispatch, useSelector } from 'react-redux'
// import edit_pencil_icon from '../../imgs/edit-pencil.svg'
import EditProfileIcons from '../EditProfileIcons/EditProfileIcons'
import { useHistory } from 'react-router-dom'

function EditDeleteProfile({setShowProfileToEdit}) {
    const profiles = useSelector(state => state.profiles)
    const history = useHistory();
    const dispatch = useDispatch();
    const [showEditProfileIcons, setShowEditProfileIcons] = useState(false)
    const [errors, setErrors] = useState([]);
    const profileId = useSelector(state => state.profiles?.editProfile.id);
    const editProfileName = profiles.editProfile.name
    const editProfileIcon = profiles.editProfile.icon
    const [profileName, setProfileName] = useState(editProfileName);
    const [profileIcon, setProfileIcon] = useState(editProfileIcon);
    const editProfile = profiles.editProfile
    const editProfileId = profiles.editProfile.id
    const allProfiles = profiles.allProfiles

    const handleOnClickDelete = async (e) => {
        // e.preventDefault();

        if (Object.keys(allProfiles).length === 1) {
            await dispatch(profileActions.delProfile(editProfileId))
            .then(setShowProfileToEdit(false))
            .then(history.push('/browse'));
        } else {
            await dispatch(profileActions.delProfile(editProfileId))
            .then(setShowProfileToEdit(false))
        }
    }

    const handleToggle = async () => {
        await dispatch(profileActions.clearCurrentEditProfileState())
        .then(setShowProfileToEdit(false))
    }

    // const handleChooseProfileIconToggle = () => {
    //     setShowEditProfileIcons(true);
    // }

    const handleOnClickEdit = async (e) => {
        // e.preventDefault();
        setErrors([]);

        const data = {
            profileId,
            icon: profileIcon,
            name: profileName,
        }

        try {
            await dispatch(profileActions.editProfile(data))
            .then(dispatch(profileActions.clearCurrentEditProfileState()))
            .then(setShowProfileToEdit(false))
        } catch (res) {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        }
    }

    const filteredErrors = errors.filter(error => error !== 'Invalid value')

    if (Object.keys(editProfile).length && showEditProfileIcons) {
        return (
            <EditProfileIcons setProfileIcon={setProfileIcon} setShowEditProfileIcons={setShowEditProfileIcons} />
        )
    } else {
        return (
            <div className='edit-profile-wrapper'>
                <h1 className="edit-profile-title">Edit Profile</h1>
                <div className="edit-profile-content">
                    <div className="edit-profile-middle-container">
                        <ul className={filteredErrors.length > 0 ? "errorList" : "hideErrorList"}>
                            {filteredErrors.map((error, idx) =>
                            <li key={idx}>
                                * {error}
                            </li>)}
                        </ul>
                        <div className="edit-profile-avatar-container">
                            {/* <img className='edit-delete-pencil-icon' src={edit_pencil_icon} onClick={handleChooseProfileIconToggle} alt="edit-pencil-icon" /> */}
                            <img className="edit-profile-avatar" src={editProfile.icon} alt="profile-avatar"  />
                        </div>
                        <input
                            type='text'
                            className="edit-profile-name"
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="edit-profile-bottom-container">
                        <button onClick={() => handleOnClickEdit()} className="edit-profile-save-btn">Save</button>
                        <button onClick={() => handleToggle()} className="edit-profile-cancel-btn">Cancel</button>
                        <button onClick={() => handleOnClickDelete()} className="edit-profile-delete-btn">Delete Profile</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditDeleteProfile
