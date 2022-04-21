import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import NetflixLogo from '../../imgs/netflix-logo-2.svg'
import { useHistory } from 'react-router-dom';

function Navigation(){
    const history = useHistory()
    const [handleShow, setHandleShow] = useState(false)
    const currentProfile = useSelector(state => state.profiles?.currentProfile);

    const handleOnClickLogo = () => {
        history.push('/')
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setHandleShow(true);
            } else setHandleShow(false);
        });
        return () => {
            window.removeEventListener('scroll', null);
        };
    }, []);

return (
    <div className={`nav-bar ${handleShow && 'nav-bar-black'}`}>
        <img onClick={handleOnClickLogo} className='netflix-logo' alt='NetFlixLogo' src={NetflixLogo} />
        {Object.keys(currentProfile).length && (
            <div className="nav-profile-icon">
                <ProfileButton currentProfile={currentProfile} />
            </div>
        )}
    </div>
    )
}

export default Navigation;
