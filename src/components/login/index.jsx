import { useForm } from 'react-hook-form';
import { Box,  Button,  TextField } from "@mui/material";
import { useContext, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import LogoutIcon from '@mui/icons-material/Logout';

import { UserContext } from '../../context/user-context';

import s from './styles.module.css'

export function Login() {
  const {currentUser, onUpdateUserId} = useContext(UserContext);
  const [open, setOpen] = useState(false);
    
  const handleClickOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
      onUpdateUserId(data)
      handleClose()
     };

     const KeyDown = () => {
      console.log('key')
     }
  

    return (
      <>
        <Button variant="contained" onClick={handleClickOpen}>
              { !!currentUser ? <LogoutIcon/> : 'Login'}
        </Button>
        <Box className={open ? s.popup_aktive : s.invisible} onMouseDown={handleClose}>
              <Box className={s.popup_container} onMouseDown={(e) => e.stopPropagation()} >
                <Button ><CancelIcon onClick={handleClose} className={s.close}/> </Button>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField className={s.input} inputProps={{tabIndex:1}} label="email" {...register("email", { required: true })} sx={{ m: 1,  p: 1 }} />
                  <TextField className={s.input} inputProps={{type:'password', tabIndex:2}} label="пароль" {...register("password", { required: true })} sx={{ m: 1,  p: 1 }} />
                  <Button className={s.input} variant="contained" type="submit" sx={{ m: 1,  p: 1 }} >Войти</Button>
                </form>
              </Box>
            </Box>
        </>
    )
}