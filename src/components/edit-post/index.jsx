/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import { Box, Button, TextField } from '@mui/material'
import { useContext } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'

import { UserContext } from '../../context/user-context'

import s from './styles.module.css'

export function EditPost ({ closePopup, id, title, text, image, tags }) {
  const { postPage, handleEditPost } = useContext(UserContext)

  const { register, handleSubmit } = useForm()

  const handleCloseEdit = () => {
    closePopup()
  }

  const onSubmit = (newPostData) => {
    handleEditPost(newPostData, id || postPage._id)
    closePopup()
  }

  return (
    <Box className={s.popup_edit_container} onMouseDown={(e) => e.stopPropagation()}>
      <Button >
        <CancelIcon onClick={handleCloseEdit} className={s.close}/>
      </Button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label='Заголовок поста' defaultValue={title || postPage.title} multiline maxRows={4} {...register('title')} margin="normal" />
        <TextField label='Текст поста' defaultValue={text || postPage.text} multiline maxRows={4} fullWidth {...register('text')} margin="normal" />
        <TextField label='Изображение' defaultValue={image || postPage.image} multiline maxRows={4} fullWidth {...register('image')} margin="normal" />
        <TextField label='Теги' defaultValue={tags ? Array(tags).join(', ') : Array(postPage.tags).join(', ')} multiline maxRows={4} fullWidth {...register('tags')} margin="normal" />
        <Button variant="contained" type="submit" sx={{ m: 2 }}>Сохранить Изменения</Button>
      </form>
    </Box>
  )
}
