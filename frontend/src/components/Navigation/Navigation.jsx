import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import NetflixLogo from '../../imgs/NetflixLogo_1.png'




function Navigation(){
    const [handleShow, setHandleShow] = useState(false)
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setHandleShow(true)
            } else {
                setHandleShow(false)
            }
        });
        return () => {
            window.removeEventListener('scroll');
        };
    }, []);

return (
    <div className={`nav-bar ${handleShow && 'nav-bar-black'}`}>
            <img className='netflix-logo' alt='NetFlixLogo' src={NetflixLogo} />
        <div className="nav-profile-icon">
            {user && <ProfileButton user={user} />}
        </div>
    </div>
    );
}

export default Navigation;
