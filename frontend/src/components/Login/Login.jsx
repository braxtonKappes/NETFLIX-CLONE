import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";
import './Login.css'

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
        <div className='login-body'>
            <div className="login-content">
                <h1 className="login-page-title">Sign In</h1>
                <form action="" className="login-form" onSubmit={handleSubmit}>
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
                </form>
            </div>
        </div>
    )
}

export default Login
