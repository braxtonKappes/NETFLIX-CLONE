import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../../store/profiles'
import bandit_icon from '../../imgs/profile-icons/number_5_bandit.png'
import panda_icon from '../../imgs/profile-icons/panda.png'
import red_chicken_icon from '../../imgs/profile-icons/red_chicken.png'
import robot_face_icon from '../../imgs/profile-icons/robot_face.png'
import super_woman_icon from '../../imgs/profile-icons/super_woman.png'
import './AddProfile.css'

function AddProfile({ setShowComponent }) {
    const dispatch = useDispatch();
    const [profileName, setProfileName] = useState("");
    const [profileIcon, setProfileIcon] = useState("");
    const [errors, setErrors] = useState([]);
    const userId = useSelector(state => state.session.user.id);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const data = {
            userId,
            icon: profileIcon,
            name: profileName,
        }
        try {
            await dispatch(profileActions.addProfile(data))
            await dispatch(profileActions.loadAllProfiles(userId))
            setShowComponent(false)
        } catch (res) {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        }
    }

    const filteredErrors = errors.filter(error => error !== 'Invalid value')

    return (
        <div className='add-profile-container'>
            <div className="add-profile-wrapper">
                <div className="add-profile-body">
                    <h1 className="add-profile-title">Add a new profile!</h1>
                    <ul className={filteredErrors.length > 0 ? "errorList" : "hideErrorList"}>
                        {filteredErrors.map((error, idx) => (
                            <li key={idx}>
                                * {error}
                            </li>
                        ))}
                    </ul>
                    <h3 className="add-profile-subtitle">Choose your profile icon</h3>
                    <form onSubmit={handleSubmit} className="add-profile-form">
                        <div className="choose-profile-icon">
                            <img
                                type="checkbox"
                                onClick={() => setProfileIcon('/profile-icons/number_5_bandit.png')}
                                src={bandit_icon}
                                alt="bandit_profile-icon"
                                className="add-profile-icon"
                            />
                            <img
                                onClick={() => setProfileIcon('/profile-icons/panda.png')}
                                src={panda_icon}
                                alt="panda_icon"
                                className="add-profile-icon"
                            />
                            <img
                                onClick={() => setProfileIcon('/profile-icons/super_woman.png')}
                                src={super_woman_icon}
                                alt="super_woman_icon"
                                className="add-profile-icon"
                            />
                            <img
                                onClick={() => setProfileIcon('/profile-icons/red_chicken.png')}
                                src={red_chicken_icon}
                                alt="red_chicken_icon"
                                className="add-profile-icon"
                            />
                            <img
                                onClick={() => setProfileIcon('/profile-icons/robot_face.png')}
                                src={robot_face_icon}
                                alt="robot_face_icon"
                                className="add-profile-icon"
                            />
                        </div>
                        <input
                            placeholder='Choose your profile name'
                            type="text"
                            className="add-profile-name"
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                        />
                    </form>
                </div>
                <div className="add-profile-buttons">
                    <button onClick={handleSubmit} className="add-profile-done-button">Done</button>
                    <button onClick={() => setShowComponent(false)} className="back-add-profile-button">Back</button>
                </div>
            </div>
        </div>
    )
}

export default AddProfile
