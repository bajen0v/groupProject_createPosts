import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import React from "react";
import { useForm } from "react-hook-form";

import api from "../../api";
import { UserContext } from "../../context/user-context";

import s from './styles.module.css'



export function AddPost({closePopup}) {
    const { UpdatePageData, pageSize} = useContext(UserContext);

    const handleClose = () => {
      closePopup();
    };

    const { register, handleSubmit } = useForm();
    
    const onSubmit = data => {
      const NewData = {
        title: data.title, 
        text: data.text, 
        image: data.image, 
        tags: data.tags.split(',')}

      api.setUserNewPost(NewData)
      .then(data => UpdatePageData(0,pageSize))
      closePopup();
     };
  
  return (
              <Box className={s.popup_container}>
                <Button ><CancelIcon onClick={handleClose} className={s.close}/> </Button>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField className={s.input} inputProps={{tabIndex:1}} label="Заголовок *" {...register("title", { required: true })} sx={{ m: 1,  p: 0 }} />
                  <TextField className={s.input} inputProps={{tabIndex:2}} label="Текст *" {...register("text", { required: true })} sx={{ m: 1,  p: 0 }} 
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    defaultValue=""
                  />
                  <TextField className={s.input} inputProps={{tabIndex:3}} label="Ссылка на изображение"  {...register("image")} sx={{ m: 1,  p: 0 }}/>
                  <TextField className={s.input} inputProps={{tabIndex:4}} label="Тэги, вводите через запятую" {...register("tags")} sx={{ m: 1,  p: 0 }}/>
                  <Button className={s.button} variant="contained" type="submit" >Добавить пост</Button>
                </form>
              </Box>
  )
}