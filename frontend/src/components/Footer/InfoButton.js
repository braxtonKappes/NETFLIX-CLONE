import React, { useState, useEffect } from "react";


function ProfileButton() {
    const [showMenu, setShowMenu] = useState(false);

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
    return (
        <div className="footerInfoContainer">
                <div className="infoButton" onClick={openMenu}>
                    <i className="fa-solid fa-circle-info"></i>
                </div>
                {showMenu && (
                    <div className="infoBar">
                        <div className="icons">
                            <a
                            href='https://github.com/braxtonKappes'
                            target="_blank"
                            rel="noreferrer"
                            >
                                <i className="fa-brands fa-github-square"></i>
                            </a>
                            <a
                            href='https://www.linkedin.com/in/braxton-kappes-b68984119/'
                            target="_blank"
                            rel="noreferrer"
                            >
                                <i className="fa-brands fa-linkedin"></i></a>
                        </div>
                        <div className="infoBarText">
                            <p>Developed By: Braxton Kappes</p>
                        </div>
                    </div>
                )}
        </div>
    );
}

export default ProfileButton;
