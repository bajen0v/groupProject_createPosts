import s from './styles.module.css'
import {  Avatar, Box,  Button, IconButton,  MenuItem,  TextField, Typography } from "@mui/material";
import { useContext, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { UserContext } from '../context/context';
import api from '../../api';
import { useForm } from 'react-hook-form';



export function EditUser({closePopup}) {
  const {currentUser, onUpdateUserName, UpdatePageData, pageSize, page} = useContext(UserContext);


  const handleClose = () => {
    closePopup();
  };

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
      const from = (page - 1) * pageSize;
      const to =(page - 1) * pageSize + pageSize;

      api.setUserInfo (data)
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
            <form onSubmit={handleSubmit(onSubmit)}>                
                <TextField label="Имя" defaultValue={currentUser?.name} {...register("name", { required: true })} sx={{ m: 1,  p: 0 }} /> 
                <TextField label="О себе" defaultValue={currentUser?.about} {...register("about", { required: true })} sx={{ m: 1,  p: 0 }} />
                <Button variant="contained" type="submit" sx={{ m: 2}}>Сохранить Изменения</Button>
            </form>
        </Box>
    )
}
