import React, { useState, useEffect } from 'react';
import { Stack, CardHeader, Divider, CardContent, Button } from '@mui/material';
import { toast } from 'react-toastify';

import CustomAppBar from '../../components/CustomAppBar';
import CustomAvatar from '../../components/CustomAvatar';

import { Profile } from '../../Models/Profile'
import server from '../../api/server';
import Utils from "../../Utils"

import './index.css'


const Profiles = () => {
  const token = localStorage.getItem("accessToken");
  const actualProfileId = localStorage.getItem("profile");
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const response = await server.get("/profiles", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProfiles(response.data);
      } catch (err) {
        toast.error('Ocorreu um erro ao buscar perfis');
      }
    }

    getProfiles();
  }, [token])

  const handleFollow = async (id: string) => {
    try {
      await server.post(`/profiles/${id}/follow`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newProfiles = profiles.map((profile) => {
        if (profile._id === id) {
          return {
            ...profile,
            followers: [...profile.followers, id],
          };
        } else if (profile._id === actualProfileId) {
          return {
            ...profile,
            following: [...profile.followers, actualProfileId],
          };
        } else {
          return profile;
        }
      })
      setProfiles(newProfiles);
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar seguir');
    }
  }

  return (
    <div>
      <CustomAppBar title='Perfis' />
      <div className='main'>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >
          {profiles.map((profile) => (
            <div>

              <div className="divComment">
                <CardHeader
                  avatar={<CustomAvatar name={profile.name} profile_id={profile._id} midia={profile.midia} />}
                  title={<h3>{Utils.fistToUpperCase(profile.name)}</h3>}
                  style={{ padding: 0 }}
                />
                <CardContent style={{ padding: 0 }}>
                  <p className="postTextComment">{profile.about} </p>
                </CardContent>
              </div>

              <div className='cardPerfilTwo' >

                <div className="followStatus">
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
                      <span>32</span>
                      <span>Posts</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant='contained'
                    sx={{ width: '100%' }}
                    onClick={() => handleFollow(profile._id)}
                  >
                    Seguir
                  </Button>
                </div>

              </div>

              <Divider />
            </div>
          ))}
        </Stack>
      </div>
    </div>
  );
}

export default Profiles;