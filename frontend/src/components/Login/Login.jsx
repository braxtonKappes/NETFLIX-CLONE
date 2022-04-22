import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from "../../store/session";
import * as profileActions from '../../store/profiles'
import './Login.css'
import DemoUser from '../DemoUser/index'
import SignUp from '../SignUp/SignUp';
import { useHistory } from 'react-router-dom';

function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [showSignUpComponent, setShowSignUpComponent] = useState(false)
    const session = useSelector(state => state.session);
    const userId = session.user.id

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        const credentialLowerCased = credential.toLowerCase();

        const user = {
            credential: credentialLowerCased,
            password: password
        }

        return dispatch(sessionActions.login(user))
        .then(profileActions.loadAllProfiles(userId))
        .then(history.push('/browse'))
        .catch(
            async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    const filteredErrors = errors.filter(error => error !== 'Invalid value')

    if (showSignUpComponent) {
        return (
            <SignUp setShowSignUpComponent={setShowSignUpComponent}/>
        )
    } else {
        return (
        <>
        <div className="login-wrapper">
            <div className='login-body'>
                <div className="login-content">
                    <form action="" className="login-form" onSubmit={handleSubmit}>
                        <h1 className="login-page-title">Sign In</h1>
                        <ul className={filteredErrors.length > 0 ? "errorList" : "hideErrorList"}>
                            {filteredErrors.map((error, idx) =>
                            <li key={idx}>
                                * {error}
                            </li>
                            )}
                        </ul>
                        <div className="email-input">
                            <input
                            className="email-input"
                            type="text"
                            placeholder='Email or Username'
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                            />
                        </div>
                        <div className="password-input">
                            <input
                            className="password-input"
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button id='buttonCard' className="login-button" type="submit">Sign In</button>
                        <div className="new-to-netflix-container">
                            New to Netflix-Clone? <button onClick={() => setShowSignUpComponent(true)}>Sign up now</button>
                        </div>
                        <div className="login-DemoUser-button">
                            <DemoUser />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
    }
}

export default Login
