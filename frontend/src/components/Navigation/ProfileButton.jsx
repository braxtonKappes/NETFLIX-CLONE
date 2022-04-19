import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ currentProfile }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const profiles = useSelector(state => Object.values(state.profiles.allProfiles))

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    history.push('/')
  };

  return Object.keys(currentProfile).length && (
    <div className="profile-dropdown-wrapper">
      <img onClick={openMenu} src={currentProfile.icon} alt="" className="current-profile-dropdown-icon" />
      {showMenu && (
        <div className="profile-dropdown">
          <div className="dropdown-profiles-list">
            {profiles.map(profile => (
              <div key={profile.id} className="dropdown-profile-container">
                <img src={profile.icon} alt="" className="dropdown-profile-icon" />
                <div className="dropdown-profile-name">
                  {profile.name}
                </div>
              </div>
            ))}
            <button onClick={logout}>Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
