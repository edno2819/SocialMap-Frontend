import React, { memo } from "react";

import { Profile } from "../../Models/Profile"
import Utils from "../../Utils"
import Cover from "../../assets/backgroundPerfil";


import "./index.css";

interface IProps {
  profile: Profile,
  QtdPost?: number,
  resume?: boolean,
  isSelf?: boolean
}

const ProfileCard = ({ profile, QtdPost = 5, resume = false, isSelf = false }: IProps) => {
  return (
    <div className="ProfileCard">

      <div className="ProfileImages">
        <img className='imgCover' src={Cover[Utils.randomNumber(0, Cover.length)]} alt="" />
        <img src={profile.midia} alt="profile" />
      </div>

      {isSelf ?
        <button>Editar</button>
        :
        <button>seguir</button>
      }

      <div className="ProfileName">
        <span>{Utils.capitalizeFirstLetter(profile.name)}</span>
        <div className="about">
          {profile.about ?
            (resume ? Utils.splitAbout(profile.about) : profile.about)
            : <></>}
        </div>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{profile.following.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{profile.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{QtdPost}</span>
            <span>Posts</span>
          </div>
        </div>
        <hr />
      </div>

      {/* <span>Meu Perfil</span> */}
    </div>
  );
};

export default memo(ProfileCard);