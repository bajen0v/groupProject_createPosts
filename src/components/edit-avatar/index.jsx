import s from './styles.module.css'
import {  Avatar, Box,  Button, IconButton,  MenuItem,  TextField, Typography } from "@mui/material";
import { useContext, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { UserContext } from '../context/context';
import api from '../../api';
import { useForm } from 'react-hook-form';



export function EditAvatar({closeMenu}) {
  const {currentUser, onUpdateUserName} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState();




  const handleClickOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
      closeMenu();
  };

   
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    setOpen(false);
    api.setUserAvatar (data)
        .then((updateUserFromServer) => {
          onUpdateUserName(updateUserFromServer)
      })
    closeMenu();
  };
 
    return (
      <>

        <MenuItem onClick={handleClickOpen} disableRipple>
        Сменить аватар
        </MenuItem>
        <Box className={open ? s.popup_aktive : s.invisible}>
        <Box className={s.popup_container}>
            <Button ><CancelIcon onClick={handleClose} className={s.close}/> </Button>
            <img src={currentUser.avatar} className={s.img}/>
            <form onSubmit={handleSubmit(onSubmit)}>                
                <TextField className={s.input} label="Ссылка на изображение" {...register("avatar", { required: true })} sx={{ m: 1,  p: 0 }} /> 
                <Button className={s.button} variant="contained" type="submit" sx={{ m: 2}}>Обновить Аватар</Button>
            </form>

        </Box>
        </Box>
                
              
       </>
    )
}
