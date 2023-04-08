import s from './styles.module.css'
import {  Avatar, Box,  Button, IconButton,  MenuItem,  TextField, Typography } from "@mui/material";
import { useContext, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { UserContext } from '../context/context';
import api from '../../api';
import { useForm } from 'react-hook-form';



export function EditAvatar({closePopup}) {
  const {currentUser, onUpdateUserName, UpdatePageData, pageSize, page} = useContext(UserContext);

  const handleClose = () => {
      closePopup();
  };

   
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const from = (page - 1) * pageSize;
    const to =(page - 1) * pageSize + pageSize;

    api.setUserAvatar (data)
        .then((updateUserFromServer) => {
          onUpdateUserName(updateUserFromServer)
      })
        .then(
          UpdatePageData(from,to))
        .catch(err => console.log(err))
      closePopup();
  };
 
    return (
        <Box className={s.popup_container}>
            <Button ><CancelIcon onClick={handleClose} className={s.close}/> </Button>
            <img src={currentUser.avatar} className={s.img}/>
            <form onSubmit={handleSubmit(onSubmit)}>                
                <TextField className={s.input} label="Ссылка на изображение" {...register("avatar", { required: true })} sx={{ m: 1,  p: 0 }} /> 
                <Button className={s.button} variant="contained" type="submit" sx={{ m: 2}}>Обновить Аватар</Button>
            </form>
        </Box>
    )
}
