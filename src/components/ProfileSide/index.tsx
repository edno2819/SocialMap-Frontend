import React from 'react'

// import FollowersCard from '../FollowersCard'
import ProfileCard from '../ProfileCard'
import { Profile } from "../../Models/Profile"

import "./index.css"


interface IProps {
  profile: Profile 
}

const ProfileSide = ({ profile }: IProps) => {

  return (
    <div className="ProfileSide">
      <ProfileCard profile={profile} />
      {/* <FollowersCard /> */}
    </div>
  )
}

export default ProfileSide