import s from './styles.module.css'
import {  Box,  Button,  TextField } from "@mui/material";
import { useContext, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { AddPost } from '../add-post';
import { UserContext } from '../context/context';
import { useForm } from 'react-hook-form';
import api from '../../api';


export function AboutUser() {
  const {currentUser, onUpdateUserId, onUpdateUserName} = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const [edit, setEdit]= useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setEdit(false);
      setOpen(false);
  };

  const handleEdit = () => {
    setEdit(true);
};

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
      api.setUserInfo (data)
        .then((updateUserFromServer) => {
          onUpdateUserName(updateUserFromServer)
      })
    };
 
    return (
      <>
              <Box className={ !!currentUser ? s.user: s.invisible}>
                <span onClick={handleClickOpen} className={s.aboutme} >{currentUser?.about} {currentUser?.name}</span>
                <AddPost/>
              </Box>
              <Box className={open ? s.popup_aktive : s.invisible}>
              <Box className={s.popup_container}>
              <Button ><CancelIcon onClick={handleClose} className={s.close}/> </Button>
                <form onSubmit={handleSubmit(onSubmit)}>
                {edit 
                ? <>
                    <TextField label="Имя" {...register("name", { required: true })} sx={{ m: 1,  p: 0 }} /> 
                    <TextField label="О себе"   {...register("about", { required: true })} sx={{ m: 1,  p: 0 }} />
                    <Button variant="contained" type="submit">Сохранить изменения</Button>
                  </>
                  :<>
                    <TextField label="Имя" value={currentUser?.name}  sx={{ m: 1,  p: 0 }} /> 
                    <TextField label="О себе" value={currentUser?.about}  sx={{ m: 1,  p: 0 }}/>
                    <Button variant="contained" onClick={handleEdit} >Редактировать</Button>
                  </>
                }

                
                </form>
                
              </Box>
             </Box>
        </>
    )
}