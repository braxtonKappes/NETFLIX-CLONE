import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";
import './AddProfile.css'

function AddProfile({ setShowComponent }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ email, password })).catch(
            async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    return (
        <div className='add-profile-container'>
            <div className="add-profile-wrapper">
                <div className="list-profiles">
                    <h1 className="whos-watching">Add a new profile</h1>
                    <ul className="choose-profile">
                        {/* map profiles here */}
                        {/* await dispatch(profileActions.loadOneProfile()) */}
                    </ul>
                </div>
                <div className="add-profile-buttons">
                    <button className="add-profile-done-button">Done</button>
                    <button onClick={() => setShowComponent(false)} className="back-add-profile-button">Back</button>
                </div>
            </div>
        </div>
    )
}

export default AddProfile
