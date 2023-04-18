import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Button, ButtonGroup, CardHeader, CardMedia, Grid, TextField, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import s from './styles.module.css'
import { useState, useContext, useEffect  } from 'react';
import api from '../../api';
import { UserContext } from '../context/context';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';


export default function PostPage({likeNumber, setLikeNumber}) {
    const { postID } = useParams();
    const [postPage, setPostPage] = useState([]);
    const [postAuthor, setPostAuthor] = useState([]);
    const { currentUser, onPostDelete, onPostLike } = useContext(UserContext);
    const [me, setMe] = useState(false);
    const [open, setOpen] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    const [openEdit, setOpenEdit] = useState(null);
    const { register, handleSubmit } = useForm();
    console.log(postID);
    
    const onSubmit = (newPostData) => {
        console.log(newPostData);
        api.editUserPost(newPostData, postPage._id)
            .then(data => setPostPage(data))
            .catch(err => console.log(err))
            .finally(setOpenEdit(false))
    }

    useEffect(() => {  
        api.getPostData(postID)
                .then (data => {
                    setPostPage(data);
                    setPostAuthor(data.author);
                    if (data.author._id === currentUser._id) {
                        setMe(true)
                    };
                    if (data.likes.some(id => id === currentUser._id)) {
                        setIsLiked(true)
                    };
                    setLikeNumber(data.likes.length)
                    })
                .catch(err => console.log(err))
     }, [likeNumber, currentUser ]);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    }
    const handleCloseEdit = () => {
        setOpenEdit(false);
    }
    
    const handleClose = () => {
        setOpen(false);
    };
    
     function DeletPost() {
        handleClose()
        onPostDelete(postPage._id)           
     }
         

     function handleClickButtonLike() {
        onPostLike(postPage)
        setIsLiked(false)
     }

     const handleAuthorisation = () => {
        alert('Необходима авторизация');
    };


    return (
        <>
            <Grid container spacing={2} className={s.postPage}>
                    <Grid item xs={12} md={8} className={s.container}>
                    <CardMedia
                            component="img"
                            height="194"
                            image={postPage.image}
                            alt="Картинка"
                            className={s.post_img}
                    />
                    <Button variant="contained" onClick={() => navigate(-1)} className={s.back_button}>Назад</Button>
                    </Grid>
                    <Grid item  md={4}>
                    <CardHeader
                            avatar={
                                <Avatar
                                    sx={{ width: 56, height: 56}}
                                    src={postAuthor.avatar}
                                    alt="Аватар"
                                />
                            }
                            action={
                                <> {me 
                                ? <>
                                    <IconButton onClick={handleClickOpen}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton onClick={handleClickOpenEdit}>
                                        <EditIcon />
                                    </IconButton>
                                   </> 
                                : <></>
                                }
                                
                                <IconButton onClick={currentUser ==='' ? handleAuthorisation : handleClickButtonLike} aria-label="add to favorites">
                                    <FavoriteIcon htmlColor={isLiked ? 'red': null}/>{likeNumber !== 0 ? likeNumber : <></>}
                                </IconButton>
                                </>
                                }
                            title={postAuthor.name}
                            subheader={postAuthor.about}
                        />
                        <Typography variant="h6" color="black" className={s.title} textAlign='center'>
                        {postPage.title}
                        </Typography>
                        <Typography paragraph textAlign="justify">{postPage.text}</Typography>
                    </Grid>
                </Grid>
                <Box className={open ? s.popup_aktive : s.invisible}>
                    <Box className={s.popup_container}>
                    <Button ><CancelIcon onClick={handleClose} className={s.close}/> </Button>
                    <Typography variant="h5" color="black">Удалить?</Typography>
                    <ButtonGroup className={s.button} variant="contained" disableElevation aria-label="outlined primary button group">
                       <Link to={`/`}>
                            <Button  sx={{ m: 2}} onClick={DeletPost}>Да</Button>
                        </Link>
                        <Button  sx={{ m: 2}} onClick={handleClose}>Нет</Button>
                    </ButtonGroup>
                    </Box>
                </Box>

                <Box className={openEdit ? s.popup_aktive : s.invisible}>
                    <Box className={s.popup_container}>
                        <Button >
                            <CancelIcon onClick={handleCloseEdit} className={s.close}/> 
                        </Button>

                        <form onSubmit={handleSubmit(onSubmit)}>                
                            <TextField defaultValue={postPage.title} {...register("title")} sx={{ m: 1,  p: 0 }} /> 
                            <TextField defaultValue={postPage.text} {...register("text")} sx={{ m: 1,  p: 0 }} />
                            <TextField defaultValue={postPage.image} {...register("image")} sx={{ m: 1,  p: 0 }} />
                            <Button variant="contained" type="submit" sx={{ m: 2 }}>Сохранить Изменения</Button>
                        </form>
                    </Box>
                </Box>
        </>
    )
}