import React from "react";
import { useNavigate } from 'react-router-dom';
import server from '../../api/server'

import { Button } from '@mui/material';
import { toast } from 'react-toastify';

import logo from '../../assets/logoAlert.png';

import './index.css'


export const ButtonsPerfilSelf = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    return (
        <div className="comands-profile-self">
            <Button variant='contained'
                sx={{ width: '100%' }}
                onClick={() => navigate("/profile/edit")}
            >
                Editar
            </Button>
            <Button variant='contained'
                sx={{ width: '100%' }}
                onClick={() => handleLogout()}
                color='error'
            >
                Logout
            </Button>

        </div>
    )
}


export const ButtonsPerfilFollow = () => {
    const token = localStorage.getItem("accessToken");
    const profileId = localStorage.getItem("profile");


    const handleFollow = async () => {
        try {
            await server.post(`/profiles/${profileId}/follow`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (err) {
            toast.error('Ocorreu um erro ao tentar seguir', {
                icon: () => <img src={logo} alt="logo SocialMap" />,
            });
        }
    }

    return (
        <div className="comands-profile-other">
            <Button variant='contained'
                onClick={() => handleFollow()}
            >
                Seguir
            </Button>
        </div>
    )

}

