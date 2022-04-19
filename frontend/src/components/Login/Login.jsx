import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";
import './Login.css'
import NetflixBG from '../../imgs/netflix-bg-img.jpg'
import DemoUser from '../DemoUser/index'

function Login() {
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
        <>
        <div className="login-wrapper">
            <img src={NetflixBG} alt="netflix-background-collage" className="login-wrapper-background" />
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
                        <input
                        className="email-input"
                        type="email"
                        placeholder='Email or phone number'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                        <input
                        className="password-input"
                        type="text"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <button id='buttonCard' className="loginButton" type="submit">Sign In</button>
                        <div className="new-to-netflix-container">
                            New to Netflix? <a href="/signup" target="_self" className="">Sign up now</a>
                        </div>
                        <DemoUser />
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login
