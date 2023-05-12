/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import { Box, Button, TextField } from '@mui/material'
import { useContext } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'

import { UserContext } from '../../context/user-context'
import api from '../../api'

import s from './styles.module.css'

export function EditUser ({ closePopup }) {
  const { currentUser, onUpdateUserName, UpdatePageData, pageSize, page } = useContext(UserContext)

  const handleClose = () => {
    closePopup()
  }

  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => {
    const from = (page - 1) * pageSize
    const to = (page - 1) * pageSize + pageSize

    api.setUserInfo(data)
      .then((updateUserFromServer) => {
        onUpdateUserName(updateUserFromServer)
      })
      .then(
        UpdatePageData(from, to))
      .catch(err => console.log(err))
    closePopup()
  }

  return (
      <Box className={s.popup_container} onMouseDown={(e) => e.stopPropagation()}>
        <Button ><CancelIcon onClick={handleClose} className={s.close}/> </Button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Имя" defaultValue={currentUser?.name} {...register('name', { required: true })} sx={{ m: 1, p: 0 }} />
          <TextField label="О себе" defaultValue={currentUser?.about} {...register('about', { required: true })} sx={{ m: 1, p: 0 }} />
          <Button variant="contained" type="submit" sx={{ m: 2 }}>Сохранить Изменения</Button>
        </form>
      </Box>
  )
}
