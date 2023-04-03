import s from './styles.module.css'
import {  Avatar, Box,  Button, IconButton,  TextField, Typography } from "@mui/material";
import { useContext, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { AddPost } from '../add-post';
import { UserContext } from '../context/context';
import api from '../../api';
import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import { Login } from '../login';


export function AboutUser() {
  const {currentUser, token, onUpdateUserName} = useContext(UserContext);
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
    const onSubmit = (data) => {
      setOpen(false);
      setEdit(false)
      api.setUserInfo (data, token)
        .then((updateUserFromServer) => {
          onUpdateUserName(updateUserFromServer)
      })
    };
 
    return (
      <>

              <Box className={ !!currentUser ? s.user: s.invisible}>
                                 <IconButton sx={{ m: 1,  p: 0 }}>
                    <Avatar src={currentUser.avatar} alt="Аватар"/>
                    </IconButton>
                  <span onClick={handleClickOpen} className={s.aboutme} >{currentUser?.name} {currentUser?.about} </span>

                  <AddPost sx={{ m: 1,  p: 0 }}/>
                  <Login sx={{ m: 1,  p: 0 }}/>

              </Box>
              <Box className={open ? s.popup_aktive : s.invisible}>
                <Box className={s.popup_container}>
                <Button ><CancelIcon onClick={handleClose} className={s.close}/> </Button>
                <img src={currentUser.avatar} alt={currentUser.name}></img>
                {edit
                ?<form onSubmit={handleSubmit(onSubmit)}>                
                  <TextField label="Имя" {...register("name", { required: true })} sx={{ m: 1,  p: 0 }} /> 
                  <TextField label="О себе" {...register("about", { required: true })} sx={{ m: 1,  p: 0 }} />
                  <Button variant="contained" type="submit">Сохранить Изменения</Button>
                  </form>
                :<>
                <Typography label="Имя" variant="h5" component="div"  className={s.Typography}>
                  {currentUser?.name}
                </Typography>
                <Typography label="Имя" variant="h5" component="div"  className={s.Typography}>
                  {currentUser?.about}
                </Typography>
                  <IconButton  onClick={handleEdit}><EditIcon/></IconButton>
                </>
                }
                </Box>
             </Box>
        </>
    )
}