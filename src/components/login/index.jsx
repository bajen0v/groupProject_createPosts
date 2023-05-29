import { useForm } from 'react-hook-form'
import { Box, Button, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'

import { UserContext } from '../../context/user-context'

import s from './styles.module.css'
import api from '../../api'

export function Login () {
  const { LoginOpen, handleLoginOpen, setCurrentUser } = useContext(UserContext)
  const [errorMessage, setErrorMessage] = useState()

  const handleOpen = () => {
    handleLoginOpen(true)
  }
  const handleClose = () => {
    handleLoginOpen(false)
  }

  const { register, handleSubmit } = useForm()
  const onSubmit = data => {
    handleUserInfo(data)
  }

  function handleUserInfo (data) {
    api.getLogIn(data)
      .then((data) => {
        setCurrentUser(data.data)
        localStorage.setItem('token', data.token)
      })
      .catch(err => {
        !err
          ? handleClose()
          : setErrorMessage(err.message)
      })
  }

  return (
      <>
        <Button variant="contained" onClick={handleOpen}>
          Login
        </Button>
        <Box className={LoginOpen ? s.popup_aktive : s.invisible} onMouseDown={handleClose}>
          <Box className={s.popup_container} onMouseDown={(e) => e.stopPropagation()} >
            <Button ><CancelIcon onClick={handleClose} className={s.close}/> </Button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField className={s.input} inputProps={{ tabIndex: 1 }} label="email" {...register('email', { required: true })} sx={{ m: 1, p: 1 }} />
              <TextField className={s.input} inputProps={{ type: 'password', tabIndex: 2 }} label="пароль" {...register('password', { required: true })} sx={{ m: 1, p: 1 }} />
              <Button className={s.input} variant="contained" type="submit" sx={{ m: 1, p: 1 }} >Войти</Button>
            </form>
            <p className={s.error}>{errorMessage}</p>
          </Box>
        </Box>
      </>
  )
}
