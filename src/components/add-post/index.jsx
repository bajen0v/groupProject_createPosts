import { Button, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import s from './styles.module.css'
import React from "react";
import { useForm } from "react-hook-form";
import AddIcon from '@mui/icons-material/Add';
import api from "../../api";
import { UserContext } from "../context/context";



export function AddPost({closeMenu}) {
    const {token, UpdatePageData, pageSize} = useContext(UserContext);
    const [open, setOpen] = useState(false);

    
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
      closeMenu();
    };

    const { register, handleSubmit } = useForm();
    
    const onSubmit = data => {
      setOpen(false);
      const NewData = {
        title: data.title, 
        text: data.text, 
        image: data.image, 
        tags: data.tags.split(',')}

      api.setUserNewPost(NewData, token)
      .then(data => UpdatePageData(0,pageSize))
      closeMenu();
     };
  
  return (
    <>
    <MenuItem onClick={handleClickOpen} disableRipple>
        Добавить пост
    </MenuItem>
    <Box className={open ? s.popup_aktive : s.invisible}>
              <Box className={s.popup_container}>
                <Button ><CancelIcon onClick={handleClose} className={s.close}/> </Button>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField className={s.input} label="Заголовок *" {...register("title", { required: true })} sx={{ m: 1,  p: 0 }} />
                  <TextField className={s.input} label="Текст *" {...register("text", { required: true })} sx={{ m: 1,  p: 0 }} 
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    defaultValue=""
                  />
                  <TextField className={s.input} label="Ссылка на изображение"  {...register("image")} sx={{ m: 1,  p: 0 }}/>
                  <TextField className={s.input} label="Тэги, вводите через запятую" {...register("tags")} sx={{ m: 1,  p: 0 }}/>
                  <Button className={s.button} variant="contained" type="submit" >Добавить пост</Button>
                </form>
              </Box>
            </Box>
    </>
  )
}