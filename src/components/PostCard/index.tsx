import React from "react";
import { Paper, CardHeader, CardContent, CardActions, Typography } from '@mui/material';
import CustomAvatar from "../CustomAvatar";
import CustomActionIcon from "../CustomActionIcon";
import { Post } from "../../Models/Post";

import "./index.css";


interface Props {
    post: Post;
}


const style = {
    paper: {
        height: 250,
        width: 200,
        margin: 20,
    },
    card: {
        padding: 10,
    }
}


const PostCard = ({ post }: Props) => {

    return (
        <Paper
            elevation={0}
            sx={{ marginX: 24 }}
        >
            <CardHeader
                avatar={<CustomAvatar profileName={post.profile.name} />}
                title={<b>{post.title}</b>}
                style={style.card}
            />
            <CardContent>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {post.content}
                </Typography>
            </CardContent>

            {post.midia ?
                (<img src={post.midia} className="imagePost" alt={post.title} />) : <></>
            }

            <CardActions>
                <div className="CardAction">
                    <CustomActionIcon
                        commentsCount={post.comments.length}
                        likeCount={post.likes.length}
                        likes={post.likes}
                        postId={post._id}
                    />
                </div>
            </CardActions>
        </Paper>
    )
}

export default PostCard;