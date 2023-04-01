import s from './styles.module.css'
import { Box,  Button,  TextField } from "@mui/material";
import { useContext, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

import { UserContext } from '../context/context';
import { group_11 } from '../../group-11';


export function Login() {
  const {currentUser, token, onUpdateUserId} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState();

    
  const handleClickOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };

  function handleToken(input) {
      setValue(input);
      group_11.forEach(element => {
        if (element._id===input) {
          setValue2(element.token)
      }})
  }

  const handleLoginIN = () => {
      onUpdateUserId(value, value2);
      setValue('');
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
              <TextField label="Id" value={value} onChange={(e) => handleToken(e.target.value)} sx={{ m: 1,  p: 0 }}/> 
              <Button variant="contained" sx={{ m: 2}} onClick={handleLoginIN}>Войти</Button>
            </Box>
        </Box>
        </>
    )
}