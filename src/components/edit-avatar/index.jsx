/* eslint-disable react/prop-types */
import { Box, Button, TextField } from '@mui/material'
import { useContext } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import { useForm } from 'react-hook-form'

import { UserContext } from '../../context/user-context'
import api from '../../api'

import s from './styles.module.css'

export function EditAvatar ({ closePopup }) {
  const { currentUser, setCurrentUser, postData, setPostData } = useContext(UserContext)

  const handleClose = () => {
    closePopup()
  }

  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => {
    api.setUserAvatar(data)
      .then((updateUserFromServer) => {
        setCurrentUser(updateUserFromServer)
        const NewPostData = postData.map(post => {
          if (post.author._id === updateUserFromServer._id) {
            post.author.avatar = updateUserFromServer.avatar
            return post
          }
          return post
        })
        setPostData(NewPostData)
      })
      .catch(err => console.log(err))
    closePopup()
  }

  return (
        <Box className={s.popup_container}onMouseDown={(e) => e.stopPropagation()}>
            <Button ><CancelIcon onClick={handleClose} className={s.close}/> </Button>
            <img src={currentUser.avatar} className={s.img}/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField className={s.input} label="Ссылка на изображение" {...register('avatar', { required: true })} sx={{ m: 1, p: 0 }} />
                <Button className={s.button} variant="contained" type="submit" sx={{ m: 2 }}>Обновить Аватар</Button>
            </form>
        </Box>
  )
}
