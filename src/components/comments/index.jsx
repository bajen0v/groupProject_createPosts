import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { UserContext } from '../../context/user-context';
import { useContext, useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../api';

export function Comments ({setPostComments, ...props}) {
    const { currentUser, postPage } = useContext(UserContext);
    const[me, setMe] = useState(false);
    useEffect(() => {   
        if (props.author._id === currentUser._id) {
        setMe(true)
    } 
     });
     
    const handleDeleteComments = () => {
        api.deleteComment(props.post, props._id)
            .then(data => setPostComments(data.comments))       
            .catch(err => console.log(err))
    }

    return (
    <>
        <CardHeader key={props._id}
            avatar={
            <Avatar
            sx={{ width: 56, height: 56}}
            src={props.author.avatar}
            alt="Аватар"
            />
            }
            action={
                <>{me 
                ? <>
                    <IconButton onClick={handleDeleteComments}>
                        <DeleteIcon />
                    </IconButton>
                </>
                : <></>}</>}
            title={props.author.name}
            subheader={props.text}
        />
    </>

    );
}