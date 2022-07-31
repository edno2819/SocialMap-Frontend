import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";

import CustomAppBar from '../../components/CustomAppBar';
import PostCard from '../../components/PostCard';
import ProfileSide from '../../components/ProfileSide'

import { Post } from "../../Models/Post";
import server from '../../api/server';
import { Profile } from '../../Models/Profile'

import "./index.css";


const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const profile_id = localStorage.getItem("profile");

  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [profile, setProfile] = useState<Profile>({ _id: '', name: '', followers: [''], following: [''], user: '' })

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await server.get(`/feed?page=${page}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setHasMore(response.data.length > 0);
        setPosts([...posts, ...response.data])
      } catch (error) {
        toast.error('Erro ao buscar postagens');
      }
    }
    getPosts();
  }, [token, page]);

  const loadMorePosts = () => {
    setPage(page + 1);
  }

  const handlePostClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  }

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await server.get(`/profiles/${profile_id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data)
        console.log(response.data)

      } catch (error) {
        toast.warning('Erro ao obter o perfil!');
      }
    }
    getProfile()
  }, [token])

  return (
    <div>
      <CustomAppBar title='Home' />
      
      <div className="Home">
        
        <ProfileSide profile={profile} />

        <div className='midDiv'>
          <InfiniteScroll
            dataLength={posts.length}
            next={loadMorePosts}
            hasMore={hasMore}
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

        <div className='divLeft'/>
      </div>



    </div>
  );
};

export default Home;