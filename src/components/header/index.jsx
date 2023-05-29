import { useContext } from 'react'
import { AppBar, Autocomplete, TextField, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import { Login } from '../login'
import { UserContext } from '../../context/user-context'
import BasicMenu from '../menu-login'

import s from './styles.module.css'

export function Header () {
  const { currentUser, setPage, allTags } = useContext(UserContext)
  const navigate = useNavigate()

  function handleGeneralPage () {
    setPage(1)
  }

  function TagPage (text) {
    text === null
      ? navigate('/')
      : navigate(`/sort/${text}`)
  }

  return (
      <>
        <header className={s.header}>
          <AppBar position="static">
           <Toolbar>
              <Typography href="/" variant="h5" component="div" sx={{ flexGrow: 1 }} onClick={handleGeneralPage} className={s.Typography} title="Перейти на первую страницу">
                  <Link to={'/'} className={s.Typography}>Блог обо всем на свете</Link>
              </Typography>
               <Autocomplete
                  disablePortal
                  className={s.tags}
                  id="combo-box-demo"
                  options={allTags}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField variant="filled" {...params} label="Поиск по тегам" />}
                  onChange={(_, text) => TagPage(text)}
                />
              {currentUser ? <BasicMenu/> : <Login/>}
            </Toolbar>
          </AppBar>
        </header>
      </>
  )
}
