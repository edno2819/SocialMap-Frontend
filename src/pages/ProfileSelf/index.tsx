import React from "react";
import { useNavigate } from 'react-router-dom';

import Profile from '../Profile'


const ProfileSelf = () => {
    const navigate = useNavigate();

    const profile_id = localStorage.getItem("profile");

    return (
        <>
            <Profile />
        </>
    );
}

export default ProfileSelf;