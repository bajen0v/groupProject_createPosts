import { useForm } from 'react-hook-form'
import { Box, Button, TextField } from '@mui/material'
import { useContext } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'

import { UserContext } from '../../context/user-context'

import s from './styles.module.css'

export function Login () {
  const { onUpdateUserId, LoginOpen, needLogin } = useContext(UserContext)

  const handleOpen = () => {
    needLogin(true)
  }
  const handleClose = () => {
    needLogin(false)
  }

  const { register, handleSubmit } = useForm()
  const onSubmit = data => {
    onUpdateUserId(data)
    handleClose()
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
          </Box>
        </Box>
      </>
  )
}
