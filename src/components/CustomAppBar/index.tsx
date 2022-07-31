import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


import CustomIconButton from "../CustomIconButton";
import SearchBar from '../SearchBar'

import './index.css'

interface Props {
    title: string;
}


const CustomAppBar = ({ title }: Props) => {
    const navigate = useNavigate();
    const profile_id = localStorage.getItem("profile");


    const [repos, setRepos] = useState('')
    const [isFetching, setIsFetching] = useState<boolean>(false)

    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        var headers = Array.from(
            document.getElementsByClassName('navbarHeader') as HTMLCollectionOf<HTMLElement>,
        );
        if (prevScrollpos > currentScrollPos) {
            headers[0].style.top = "0";
        } else {
            headers[0].style.top = "-50px";
        }
        prevScrollpos = currentScrollPos;
    }



    function handleSearch(e: React.KeyboardEvent<HTMLDivElement>) {
        // const value = e.target.value
        // const keyCode = e.which || e.keyCode
        const ENTER = 13

        // if (keyCode === ENTER) {
        //     setIsFetching(true)
        //     setIsFetching(false)
        // }
    }


    return (
        <>
            <div className='navbarHeader'>
                <Link className='headerTitle' to='/home'>SocialMap</Link>

                <SearchBar placeholder='Pesquise por posts' handleSearch={handleSearch} />

                <div className='headerIcons'>
                    <CustomIconButton
                        label="Show Home"
                        onCLickCallback={() => navigate('/home')}
                    >
                        <HomeIcon />
                    </CustomIconButton>
                    <CustomIconButton
                        label="Show Edit"
                        onCLickCallback={() => navigate('/create')}
                    >
                        <EditIcon />
                    </CustomIconButton>
                    <CustomIconButton
                        label="Show Profiles"
                        onCLickCallback={() => navigate('/profiles')}
                    >
                        <GroupIcon />
                    </CustomIconButton>
                    <CustomIconButton
                        label="Show Profile"
                        onCLickCallback={() => navigate(`/profile/${profile_id}`)}
                    >
                        <AccountCircleIcon />
                    </CustomIconButton>
                </div>

                <DropdownButton className="headerIconsMobile" id="dropdown-variants-Danger" variant='danger' title="all">
                    <Dropdown.Item href="#home">Home</Dropdown.Item>
                    <Dropdown.Item href="#carros">Carros</Dropdown.Item>
                    <Dropdown.Item href="#sobre">Sobre</Dropdown.Item>
                    <Dropdown.Item href="#contact">contato</Dropdown.Item>
                    <Dropdown.Item href="#localizacao">Localização</Dropdown.Item>
                    <Dropdown.Item href="https://fkaveiculos-backend.herokuapp.com/admin">Admin</Dropdown.Item>
                </DropdownButton>

            </div>
            <div style={{ height: '60px' }} />
        </>
    )
}

export default CustomAppBar;