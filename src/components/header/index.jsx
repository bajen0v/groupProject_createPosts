import s from './styles.module.css'
import { AppBar,  Toolbar, Typography } from "@mui/material";
import { Login } from '../login';
import { useContext } from 'react';
import { UserContext } from '../context/context';
import BasicMenu from '../menu-login';
import { Link } from 'react-router-dom';

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
           <Typography href="/" variant="h5" component="div" sx={{ flexGrow: 1 }} className={s.Typography} onClick={handleGeneralPage} title="Главная страница">
                  <Link to={`/`} className={s.Typography}>Блог обо всем на свете</Link>
              </Typography>
              {currentUser ? <BasicMenu/> : <Login/>}
            </Toolbar>
          </AppBar>
        </header>
        </>
    )
}