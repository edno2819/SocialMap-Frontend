import React from 'react'

import "./HomeLauch.css";
import logo from '../../assets/logo7.png'


type Props = {
    children: JSX.Element,
};

const HomeLauch = ({ children }: Props) => {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    {/* <img src={logo} className="logo" alt="logo"/> */}
                    <h3 className="loginLogo">SocialMap</h3>
                    <span className="loginDesc">
                        A melhor comunidade de desenvolvedores!
                    </span>
                </div>
                <div className="loginRight">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default HomeLauch;