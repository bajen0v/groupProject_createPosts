import s from './styles.module.css'
import { AppBar, Box,  Button,  TextField, Toolbar, Typography } from "@mui/material";
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';



export function Header({user, onUpdateIserId}) {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] =useState('');
    

  const handleClickOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };

  const handleLoginIN = () => {
      onUpdateIserId(userId)
      setOpen(false);
    }


    return (

      <>
        <header className={s.header}>      
          <AppBar position="static">
           <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} className={s.Typography}>
              Блог обо всем на свете
            </Typography>
            <Button variant="contained" onClick={handleClickOpen} className={ !!user ? s.invisible : console.log("login")}>
            { !!user ? 'Сменить ID' : 'Login'}
            </Button>
            <Box className={open ? s.popup_aktive : s.invisible}>
              <Box className={s.popup_container}>
                <Button ><CancelIcon onClick={handleClose} className={s.close}/> </Button>
                <TextField label="Id" value={userId} onChange={(e) => setUserId(e.target.value)} sx={{ m: 1,  p: 0 }}/> 
                <Button variant="contained" sx={{ m: 2}} onClick={handleLoginIN}>Войти</Button>
              </Box>
            </Box>
            <Box className={ !!user ? s.user: s.invisible}>
              <span>{user?.about} {user?.name}</span>
            </Box>
           </Toolbar>
          </AppBar>
        </header>
        </>
    )
}