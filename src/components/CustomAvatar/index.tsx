import React from "react";
import { Avatar } from '@mui/material';
// import { Profile } from "../../Models/Profile";



// const CustomAvatar = ({ profile }: { profile: Profile }) => {
//     const getInicials = (name: string) => {
//         name.split(" ")
//             .slice(0, 2)
//             .map((name) => name[0])
//     };

//     return ({ profile.midia ?
//                 (<Avatar
//                     sx={{ bgcolor: "red" }}
//                     arial-label={profile}
//                 >
//                     {getInicials(profile.name)}
//                 </Avatar>
//                 ) : (<Avatar
//                     sx={{ bgcolor: "red" }}
//                     src={profile.midia} />)
//         })
// }



const CustomAvatar = ({ profileName }: { profileName: string }) => {
    const getInitials = (name: string) =>
      name
        .split(" ")
        .slice(0, 2)
        .map((name) => name[0]);
    return (
      <Avatar sx={{ bgcolor: "red" }} arial-label={profileName}>
        {getInitials(profileName)}
      </Avatar>
    );
  };
  

export default CustomAvatar;