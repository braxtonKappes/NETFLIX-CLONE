import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import NetflixLogo from '../../imgs/NetflixLogo_1.png'
import * as profileActions from '../../store/profiles'



function Navigation(){
    const [isLoaded, setIsLoaded] = useState(false);
    const [handleShow, setHandleShow] = useState(false)
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setHandleShow(true)
            } else setHandleShow(false)
        });
        return () => {
            window.removeEventListener('scroll');
        };
    }, []);

    useEffect(() => {
        const fetchProfiles = async () => {
            // await dispatch(profileActions.loadOneProfile());
            setIsLoaded(true)
        }
        fetchProfiles();
    }, [dispatch]);

return (
    <div className={`nav-bar ${handleShow && 'nav-bar-black'}`}>
        <img className='netflix-logo' alt='NetFlixLogo' src={NetflixLogo} />
        <div className="profile-icon">
            {isLoaded && <ProfileButton user={user} />}
        </div>
    </div>
    );
}

export default Navigation;
