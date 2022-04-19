import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './DemoUser.css'

function DemoUser() {
    const history = useHistory();
    const dispatch = useDispatch();

    const demoUserLogin = async (e) => {
        e.preventDefault()

        await dispatch(sessionActions.login({ credential: "demo@gmail.com", password: "password" }));
        history.push('/browse')
    };

    return (
        <div>
            <button onClick={demoUserLogin} id='' className="demoUserButton">
                <i className="fa-solid fa-user"></i>
                <p>Demo User</p>
            </button>
        </div>
    )
}

export default DemoUser;
