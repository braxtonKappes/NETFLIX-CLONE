import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
        async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        }
    );
};

    return (
    <div className="formContainer">
        <form className='loginForm' onSubmit={handleSubmit}>
            <ul className={errors.length > 0 ? "errorList" : "hideErrorList"}>
            {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
            ))}
            </ul>
            <label>
            Username or Email
            </label>
            <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
            />
            <label>
            Password
            </label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button id='buttonCard' className="loginButton" type="submit">Log In</button>
        </form>
    </div>
    );
}

export default LoginForm;
