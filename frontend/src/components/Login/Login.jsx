import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";
import './Login.css'
import DemoUser from '../DemoUser/index'
import SignUp from '../SignUp/SignUp';

function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [showSignUpComponent, setShowSignUpComponent] = useState(false)

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

    if (showSignUpComponent) {
        return (
            <SignUp setShowSignUpComponent={setShowSignUpComponent} />
        )
    } else {
        return (
        <>
        <div className="login-wrapper">
            <div className='login-body'>
                <div className="login-content">
                    <form action="" className="login-form" onSubmit={handleSubmit}>
                        <h1 className="login-page-title">Sign In</h1>
                        <ul className={errors.length > 0 ? "errorList" : "hideErrorList"}>
                            {errors.map((error, idx) =>
                            <li key={idx}>
                                {error}
                            </li>
                            )}
                        </ul>
                        <div className="email-input">
                            <input
                            className="email-input"
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                        </div>
                        <div className="password-input">
                            <input
                            className="password-input"
                            type="text"
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
