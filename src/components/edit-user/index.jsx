import s from './styles.module.css'
import {  Avatar, Box,  Button, IconButton,  MenuItem,  TextField, Typography } from "@mui/material";
import { useContext, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { UserContext } from '../context/context';
import api from '../../api';
import { useForm } from 'react-hook-form';



export function EditUser({closeMenu}) {
  const {currentUser, token, onUpdateUserName} = useContext(UserContext);
  const [open, setOpen] = useState(false);




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
      api.setUserInfo (data, token)
        .then((updateUserFromServer) => {
          onUpdateUserName(updateUserFromServer)
      })
      closeMenu();
    };
 
    return (
      <>

        <MenuItem onClick={handleClickOpen} disableRipple>
        Редактировать данные
        </MenuItem>
        <Box className={open ? s.popup_aktive : s.invisible}>
        <Box className={s.popup_container}>
            <Button ><CancelIcon onClick={handleClose} className={s.close}/> </Button>
            <form onSubmit={handleSubmit(onSubmit)}>                
                <TextField label="Имя" defaultValue={currentUser?.name} {...register("name", { required: true })} sx={{ m: 1,  p: 0 }} /> 
                <TextField label="О себе" defaultValue={currentUser?.about} {...register("about", { required: true })} sx={{ m: 1,  p: 0 }} />
                <Button variant="contained" type="submit" sx={{ m: 2}}>Сохранить Изменения</Button>
            </form>
        </Box>
        </Box>
                
              
       </>
    )
}
