import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import s from './styles.module.css'
import React from "react";
import { useForm } from "react-hook-form";
import AddIcon from '@mui/icons-material/Add';
import api from "../../api";



export function AddPost() {
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const { register, handleSubmit } = useForm();
    
    const onSubmit = data => {
      
      const NewData = {
        title: data.title, 
        text: data.text, 
        image: data.image, 
        tags: data.tags.split(',')}
      api.setUserNewPost(NewData)
    };
  
 

  return (
    <>
    <Button variant="contained" onClick={handleClickOpen}><AddIcon/></Button>
    <Box className={open ? s.popup_aktive : s.invisible}>
              <Box className={s.popup_container}>
                <Button ><CancelIcon onClick={handleClose} className={s.close}/> </Button>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField label="Заголовок"  defaultValue="" {...register("title", { required: true })} sx={{ m: 1,  p: 0 }} />
                  <TextField label="Текст" {...register("text", { required: true })} sx={{ m: 1,  p: 0 }} />
                  <TextField label="Ссылка на изображение"  {...register("image")} sx={{ m: 1,  p: 0 }}/>
                  <TextField label="Тэги" {...register("tags")} sx={{ m: 1,  p: 0 }}/>
                  <Button variant="contained" type="submit">Добавить пост</Button>
                </form>
              </Box>
            </Box>
    </>
  )
}