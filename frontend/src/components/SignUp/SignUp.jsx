import React, { useState } from 'react'
import './SignUp.css'
import sideArrow from '../../imgs/side-arrow-right.svg'
import * as sessionActions from "../../store/session";
import { useDispatch } from 'react-redux';

function SignUp({setShowSignUpComponent}) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (password === confirmPassword) {
            setErrors([]);
            const newUsername = username.toLowerCase();
            const newEmail = email.toLowerCase();

            const signUpData = {
                email: newEmail,
                username: newUsername,
                password: password,
            }
            return dispatch(sessionActions.signup(signUpData))
            .then(setShowSignUpComponent(false))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
                });
            }
            return setErrors(['Passwords do not match!']);
        };

    return (
        <>
            <div className="signup-story-wrapper">
                <div className='signup-story-body'>
                    <div className="signup-story-content">
                        <h1 className="story-title">
                            Unlimited movies, TV shows, and more.
                        </h1>
                        <h2 className="story-subtitle">
                            Watch anywhere. Cancel anytime.
                        </h2>
                        <form onSubmit={handleSubmit} className="signup-form">
                            <h3 className="form-title">
                                Ready to watch? Create your membership to start watching.
                            </h3>
                            <ul className={errors.length > 0 ? "errorList" : "hideErrorList"}>
                                {errors.map((error, idx) =>
                                <li key={idx}>
                                    * {error}
                                </li>)}
                            </ul>
                            <input
                                placeholder='Email Address'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                placeholder='Username'
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <input
                                placeholder='Password'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                placeholder='Confirm Password'
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button className="signup-form-get-started-btn">
                                <span className="signup-form-btn-text">Get Started</span>
                                <img alt='side_arrow' src={sideArrow} className="signup-form-side-arrow" />
                            </button>
                        </form>
                        <button onClick={() => setShowSignUpComponent(false)} className="back-add-profile-button">Back</button>
                    </div>
                </div>
            </div>
            <div className="second-story-card">

            </div>

        </>
    )
}

export default SignUp
