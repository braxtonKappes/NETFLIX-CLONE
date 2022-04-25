import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import * as profileActions from '../../store/profiles';

function ProfileButton({ currentProfile }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const profiles = useSelector(state => state.profiles)
  const allProfiles = profiles.allProfiles

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
    await dispatch(profileActions.clearAllProfileState());
  };

  return Object.keys(currentProfile).length && (
    <div className="profile-dropdown-wrapper">
      <img onClick={openMenu} src={currentProfile.icon} alt="" className="current-profile-dropdown-icon" />
      {showMenu && (
        <div className="profile-dropdown">
            {Object.values(allProfiles).filter((profile) => profile.id !== currentProfile.id).map(profile => (
              <div key={profile.id} className="dropdown-profile-container">
                <img onClick={() => dispatch(profileActions.loadOneProfile(profile.id)).then(() => history.push('/browse'))} src={profile.icon} alt="" className="dropdown-profile-icon" />
                <div className="dropdown-profile-name">
                  {profile.name}
                </div>
              </div>
            ))}
            <div className="profile-dropdown-btns">
              <Link to={'/profiles/manage'} onClick={() => dispatch(profileActions.clearCurrentProfileState())} className="manage-profiles-button dropdown">Manage Profiles</Link>
              <button className="log-out-btn" onClick={logout}>Log Out</button>
            </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
