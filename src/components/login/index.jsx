import s from './styles.module.css'
import { Box,  Button,  TextField } from "@mui/material";
import { useContext, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from '../context/context';
import api from '../../api';
import { useForm } from 'react-hook-form';


export function Login() {
  const {currentUser, token, onUpdateUserId} = useContext(UserContext);
  const [open, setOpen] = useState(false);
    
  const handleClickOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
      document.cookie1=("email", data.email)
      console.log(document.cookie)
      onUpdateUserId(data)
      handleClose()
     };

  

    return (
      <>
        <Button variant="contained" onClick={handleClickOpen}>
              { !!currentUser ? <LogoutIcon/> : 'Login'}
        </Button>
        <Box className={open ? s.popup_aktive : s.invisible}>
              <Box className={s.popup_container}>
                <Button ><CancelIcon onClick={handleClose} className={s.close}/> </Button>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField className={s.input} label="email" {...register("email", { required: true })} sx={{ m: 1,  p: 1 }} />
                  <TextField className={s.input} label="пароль" {...register("password", { required: true })} sx={{ m: 1,  p: 1 }} />
                  <Button className={s.input} variant="contained" type="submit" sx={{ m: 1,  p: 1 }} >Войти</Button>
                </form>
              </Box>
            </Box>
        </>
    )
}