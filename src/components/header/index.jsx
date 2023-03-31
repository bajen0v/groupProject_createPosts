import s from './styles.module.css'
import { AppBar, Box,  Button,  TextField, Toolbar, Typography } from "@mui/material";

import { Login } from '../login';
import { AboutUser } from '../about-user';

export function Header() {
  
    return (
      <>
        <header className={s.header}>      
          <AppBar position="static">
           <Toolbar>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} className={s.Typography}>
                Блог обо всем на свете
              </Typography>
              <AboutUser/>
              <Login/>
            </Toolbar>
          </AppBar>
        </header>
        </>
    )
}