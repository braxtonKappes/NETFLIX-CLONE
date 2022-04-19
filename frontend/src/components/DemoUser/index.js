import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './DemoUser.css'
import DemoUser_profile_icon from '../../imgs/DemoUser-profile-icon.png'


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
            <div onClick={demoUserLogin} id='' className="demoUserButton">
                <img src={DemoUser_profile_icon} />.
                <h2>Demo User</h2>
            </div>
        </div>
    )
}

export default DemoUser;
