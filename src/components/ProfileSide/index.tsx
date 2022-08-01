import React, { memo } from 'react'

import ProfileCard from '../ProfileCard'
import { Profile } from "../../Models/Profile"

import "./index.css"


interface IProps {
  profile: Profile
}

const ProfileSide = ({ profile }: IProps) => {

  return (
    <div className="ProfileSide">
      <ProfileCard profile={profile} resume={true} />
    </div>
  )
}

export default memo(ProfileSide)