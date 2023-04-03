import s from './styles.module.css'
import { AppBar,  Toolbar, Typography } from "@mui/material";

import { Login } from '../login';
import { AboutUser } from '../about-user';
import { useContext } from 'react';
import { UserContext } from '../context/context';

export function Header() {
  const {currentUser, UpdatePageData, onPage, pageSize} = useContext(UserContext);

  function handleGeneralPage() {
    onPage(1)
    UpdatePageData(0,12)
  }
    return (
      <>
        <header className={s.header}>      
          <AppBar position="static">
           <Toolbar>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} className={s.Typography} onClick={handleGeneralPage}>
                Блог обо всем на свете
              </Typography>
              {currentUser ? <AboutUser/> : <Login/>}
            </Toolbar>
          </AppBar>
        </header>
        </>
    )
}