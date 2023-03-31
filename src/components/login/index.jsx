import s from './styles.module.css'
import { Box,  Button,  TextField } from "@mui/material";
import { useContext, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

import { UserContext } from '../context/context';



export function Login() {
  const {currentUser, onUpdateUserId} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] =useState('');
    

  const handleClickOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };

  const handleLoginIN = () => {
      onUpdateUserId(userId)
      setOpen(false);
    }


    return (
      <>
        <Button variant="contained" onClick={handleClickOpen}>
              { !!currentUser ? 'Сменить ID' : 'Login'}
        </Button>
        <Box className={open ? s.popup_aktive : s.invisible}>
            <Box className={s.popup_container}>
              <Button ><CancelIcon onClick={handleClose} className={s.close}/> </Button>
              <TextField label="Id" onChange={(e) => setUserId(e.target.value)} sx={{ m: 1,  p: 0 }}/> 
              <Button variant="contained" sx={{ m: 2}} onClick={handleLoginIN}>Войти</Button>
            </Box>
        </Box>
        </>
    )
}