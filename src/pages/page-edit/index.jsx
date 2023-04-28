import { useForm } from 'react-hook-form';
import {  Box,  Button, TextField } from "@mui/material";
import { useContext } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

import { UserContext } from '../../context/user-context';

import s from './styles.module.css'

export function EditPost({closePopup}) {
  const { postPage, handleEditPost} = useContext(UserContext);

  const { register, handleSubmit } = useForm();

  const handleCloseEdit = () => {
    closePopup();
  };

    const onSubmit = (newPostData) => {
      handleEditPost(newPostData, postPage._id);
      closePopup()
      /* for (let key in newPostData) { 
          if (!newPostData[key]) delete newPostData[key];
      }
      api.editUserPost(newPostData, postPage._id)
          .then(data => setPostPage(data))
          .catch(err => console.log(err))
          .finally(setOpenEdit(false)) */
  }
 
    return (
      <Box className={s.popup_edit_container} onMouseDown={(e) => e.stopPropagation()}>
      <Button >
          <CancelIcon onClick={handleCloseEdit} className={s.close}/> 
      </Button>

      <form onSubmit={handleSubmit(onSubmit)}>               
          <TextField label='Заголовок поста' defaultValue={postPage.title} multiline maxRows={4} {...register("title")} margin="normal" /> 
          <TextField label='Текст поста' defaultValue={postPage.text} multiline maxRows={4} fullWidth {...register("text")} margin="normal" />
          <TextField label='Изображение' defaultValue={postPage.image} multiline maxRows={4} fullWidth {...register("image")} margin="normal" />
          <TextField label='Теги' defaultValue={Array(postPage.tags).join(', ')} multiline maxRows={4} fullWidth {...register("tags")} margin="normal" />
          <Button variant="contained" type="submit" sx={{ m: 2 }}>Сохранить Изменения</Button>
      </form>
  </Box>
    )
}
