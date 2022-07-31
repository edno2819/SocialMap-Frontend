import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import server from '../../api/server'
import InfiniteScroll from "react-infinite-scroll-component";

import PostCard from '../../components/PostCard';

import CustomAppBar from '../../components/CustomAppBar';
import ProfileCard from '../../components/ProfileCard'

import { Profile } from '../../Models/Profile'
import { Post } from "../../Models/Post";


import './index.css'

const ProfilePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const { profileId } = useParams();

  const [profile, setProfile] = useState<Profile>({ _id: '', name: '', followers: [''], following: [''], user: '' })
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState<number>(0)


  // const handleLogout = async () => {
  //   toast.info(`Até mais, ${profile.name}!`)
  //   localStorage.clear();
  //   navigate("/");
  // }

  useEffect(() => {
    const getProfile = async () => {
      try {
        const responseProfile = await server.get(`/profiles/${profileId}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setProfile(responseProfile.data)
      } catch (error) {
        toast.warning('Erro ao obter o perfil!');
      }
    }
    getProfile()
  }, [token, profileId])

  useEffect(() => {
    const getPosts = async () => {
      try {
        const responsePost = await server.get(`/feed/profile/${profileId}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        console.log(responsePost.data)
        setPosts(responsePost.data)

      } catch (error) {
        toast.warning('Erro ao obter os Posts!');
      }
    }
    getPosts()
  }, [token, profileId])

  const loadMorePosts = () => {
    setPage(page + 1);
  }

  const handlePostClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  }

  return (
    <>
      <CustomAppBar title='Perfil' />
      <div className='ProfileBody'>
        <ProfileCard profile={profile} QtdPost={posts.length} />
        <br />

        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={false}
          loader={<h4>Loading...</h4>}
        >
          {posts && posts.map((post) => (
            <div key={post._id}>
              <PostCard post={post} handlePostClick={handlePostClick} />
              <hr />
            </div>
          ))}
        </InfiniteScroll>

      </div>
    </>
  );
}

export default ProfilePage;