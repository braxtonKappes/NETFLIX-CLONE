import React from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './DemoUser.css'

function DemoUser() {
    const dispatch = useDispatch();
    const demoUserLogin = async (e) => {
        e.preventDefault()

        try {
            await dispatch(
            sessionActions.login({
                credential: "demo@gmail.com",
                password: "password",
            })
        );
        } catch (err) {
            console.error("error: ", err)
        }

    };

    return (
        <div>
            <form onSubmit={demoUserLogin}>
                <button id='' className="demoUserButton">
                    <i className="fa-solid fa-user"></i>
                    <p>Demo User</p>
                </button>
            </form>
        </div>
    )
}

export default DemoUser;
