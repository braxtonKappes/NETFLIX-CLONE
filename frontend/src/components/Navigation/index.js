import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormModal';
import DemoUser from '../DemoUser';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser) {
    sessionLinks = (
        <ProfileButton user={sessionUser} />
    );
    } else {
    sessionLinks = (
        <div className='sessionLinks'>
        <LoginFormModal />
        <SignUpFormModal />
        <DemoUser />
        </div>
    );
}

return (
    <nav className='navBar'>
        <NavLink exact to='/' className='logoClickHome'><img alt='Logo' className='bnbLogo'></img></NavLink>
        <div className='rightContainer'>
            <NavLink exact to='/spots/host' className='becomeHost'>Become a Host</NavLink>
            {isLoaded && sessionLinks}
        </div>
    </nav>
    );
}

export default Navigation;
