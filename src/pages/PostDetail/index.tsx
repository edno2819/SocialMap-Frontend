import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { Divider, TextField, Button, CardHeader, CardContent } from "@mui/material";

import { Post } from "../../Models/Post";
import server from '../../api/server';
import PostCard from "../../components/PostCard";
import CustomAppBar from '../../components/CustomAppBar';
import CustomAvatar from "../../components/CustomAvatar";

import Utils from "../../Utils"

import "./index.css";



const PostDetail = () => {
    const token = localStorage.getItem('accessToken');
    const profileId = localStorage.getItem('profile');
    const profileName = localStorage.getItem('name');

    const { postId } = useParams();
    const [post, setPost] = useState<Post>();
    const [comment, setComment] = useState({ value: "", error: "" });

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await server.get(`/posts/${postId}`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                setPost(response.data);
            } catch (err) {
                toast.error('Não foi possível carregar o post');
            }
        }

        getPost();
    }, [token]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await server.post(`/posts/${postId}/comment`,
                { description: comment.value },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });

            setComment({ ...comment, value: "" });
            const newComment = {
                ...response.data,
                description: comment.value,
                profile: {
                    _id: profileId,
                    name: profileName,
                }
            }
            post?.comments.push(newComment);
            setPost(post);
            toast.success('Comentário realizado!');

        } catch (err) {
            toast.error('Ocorreu um erro ao adicionar um comentário');
        }
    };

    return (
        <div className='midDivPost'>
            <CustomAppBar title="Post" />
            <div style={{ marginTop: "56px" }}>
                {post && <PostCard post={post} handlePostClick={() => { }} />}
            </div>
            <br />
            <Divider style={{ marginRight: "10%", marginLeft: "10%" }} />
            <br />
            <div className="containerComment">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <TextField
                        id="comment"
                        label="Novo comentário"
                        variant="standard"
                        multiline
                        minRows={3}
                        fullWidth
                        value={comment.value}
                        onChange={(e) => setComment({ value: e.target.value, error: "" })}
                    />
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "end"
                    }}>
                        <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
                            Publicar
                        </Button>
                    </div>
                </form>
            </div >
            {post?.comments && post?.comments.map((item) => {
                return (item.profile ?
                    (<div className="main" key={item._id}>
                        <CardHeader
                            avatar={<CustomAvatar profileName={item.profile.name} />}
                            title={<h3>{Utils.fistToUpperCase(item.profile.name)}</h3>}
                            style={{ padding: 0 }}
                        />
                        <CardContent style={{ padding: 0 }}>
                            <p className="postTextComment">{item.description} </p>
                        </CardContent>
                    </div>)
                    :
                    (<></>)
                )
            })}
        </div>
    );
}

export default PostDetail;