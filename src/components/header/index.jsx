import { useContext } from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import { Login } from '../login'
import { UserContext } from '../../context/user-context'
import BasicMenu from '../menu-login'

import s from './styles.module.css'

export function Header () {
  const { currentUser, onPage } = useContext(UserContext)

  function handleGeneralPage () {
    onPage(1)
  }
  return (
      <>
        <header className={s.header}>
          <AppBar position="static">
           <Toolbar>
              <Typography href="/" variant="h5" component="div" sx={{ flexGrow: 1 }} className={s.Typography} onClick={handleGeneralPage} title="Главная страница">
                  <Link to={'/'} className={s.Typography}>Блог обо всем на свете</Link>
              </Typography>
              {currentUser ? <BasicMenu/> : <Login/>}
            </Toolbar>
          </AppBar>
        </header>
      </>
  )
}
