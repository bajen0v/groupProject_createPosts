import * as React from 'react';
import { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import { UserContext } from '../../context/user-context';
import {  Button,  Container,  Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import api from '../../api';
import s from './styles.module.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'react-router-dom';

export function Add_comments ({setPostComments}) {
  const { currentUser, needLogin } = useContext(UserContext);
  const { postID } = useParams();
  const { register, handleSubmit, reset } = useForm();
    
  const onSubmit = (data) => {
    currentUser === ''
    ? needLogin(true)
    : api.setComments(data, postID)
        .then((data) => setPostComments(data.comments))
        reset();
     };

    return (
        <Grid container spacing={2} className={s.comment} >
                <Avatar className={s.avatar}
                                sx={{ width: 56, height: 56}}
                                src={currentUser.avatar}
                                alt="Аватар"
                            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField label="Написать комментарий..." {...register("text", { required: true })} className={s.text} />
                <IconButton   type="submit" color="primary"><ArrowForwardIosIcon/></IconButton>
            </form>
        </Grid>
    );
}