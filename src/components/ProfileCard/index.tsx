import React from "react";

import Cover from "../../assets/cover.jpg";
import { Profile } from "../../Models/Profile"
import Utils from "../../Utils"

import "./index.css";

interface IProps {
  profile: Profile
}

const ProfileCard = ({ profile }: IProps) => {

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="" />
        <img src={profile.midia} alt="profile" />
      </div>

      <div className="ProfileName">
        <span>{profile.name}</span>
        <div className="about">
          {profile.about ? Utils.splitAbout(profile.about): <></>}
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
        </div>
        <hr />
      </div>
      <span>Meu Perfil</span>
    </div>
  );
};

export default ProfileCard;