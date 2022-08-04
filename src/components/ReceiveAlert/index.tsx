import React, { memo, useEffect, useState, useContext } from 'react'
import io from "socket.io-client"
import CONSTANTS from '../../constants'

import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { Badge } from '@mui/material';

import { Alerts } from '../../contexts/AlertsContext'

import CustomIconButton from "../CustomIconButton";

import './index.css'

const ReceiveAlert = () => {
    const token = localStorage.getItem("accessToken");

    const { countPersistent } = useContext(Alerts)
    const [messageCount, setMessageCount] = useState(countPersistent.current);

    const socket = io(CONSTANTS.SOCKET_HOST, {
        auth: { token },
        secure: true,
    })

    useEffect(() => {
        // socket.on("connect_profile", (id) => {
        //     console.log('connect_profile', id);
        // });

        // socket.on("disconnect", () => {
        //     console.log(`disconnect socket`);
        // });

        socket.on("post-new", (data) => {
            console.log(`post socket- ${data}`);
            countPersistent.current["post-new"] += 1
        });

        socket.on("post-like", (data) => {
            console.log(`post-like socket- ${data}`);
            countPersistent.current["post-like"] += 1
        });

        socket.on("comment-new", (data) => {
            console.log(`comment-new- ${data}`);
            countPersistent.current["comment-new"] += 1
        });

        socket.on("follow-new", (data) => {
            countPersistent.current["follow-new"] += 1
            console.log(data);
        });

        socket.on("connect_error", (err) => {
            console.log(err);
        });

        return () => {
            socket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, socket]);

    const handleCleanAlert = (value: string) => {
        if (messageCount) {
            countPersistent.current[value] = 0
            window.location.reload();
        }
    };

    useEffect(() => {
        setMessageCount(countPersistent.current)
    }, [countPersistent]);

    return (
        <>
            <li className="dropdownAlert">
                <div className="dropbtnAlert">{
                    <Badge
                        badgeContent={
                            Object.keys(messageCount).reduce((sum, key) => sum + parseFloat(messageCount[key] || 0), 0)
                        }
                        color="error">
                        <NotificationsIcon />
                    </Badge>
                }</div>

                <div className="dropdownAlert-content">
                    <CustomIconButton
                        label="post-like"
                        onCLickCallback={() => handleCleanAlert("post-like")}
                    >
                        <Badge badgeContent={messageCount["post-like"]} color="error">

                            <ThumbUpIcon />
                        </Badge>
                    </CustomIconButton>

                    <CustomIconButton
                        label="comment-new"
                        onCLickCallback={() => handleCleanAlert("comment-new")}
                    >
                        <Badge badgeContent={messageCount["comment-new"]} color="error">

                            <AddCommentIcon />
                        </Badge>
                    </CustomIconButton>

                    <CustomIconButton
                        label="follow-new"
                        onCLickCallback={() => handleCleanAlert("follow-new")}
                    >
                        <Badge badgeContent={messageCount["follow-new"]} color="error">
                            <PersonAddIcon />
                        </Badge>
                    </CustomIconButton>

                    <CustomIconButton
                        label="post-new"
                        onCLickCallback={() => handleCleanAlert("post-new")}
                    >
                        <Badge badgeContent={messageCount["post-new"]} color="error">
                            <PostAddIcon />
                        </Badge>
                    </CustomIconButton>
                </div>
            </li>
        </>



    )
}

export default memo(ReceiveAlert);