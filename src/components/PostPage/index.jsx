import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Button, ButtonGroup, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import s from './styles.module.css'
import { useState, useContext, useEffect  } from 'react';
import api from '../../api';
import { UserContext } from '../context/context';
import { Link, useNavigate, useParams } from 'react-router-dom';


export default function PostPage() {
    const { postID } = useParams();
    const [postData, setPostData] = useState([]);
    const [postAuthor, setPostAuthor] = useState([]);
    const { currentUser, onPostDelete, onPostLike} = useContext(UserContext);
    const [me, setMe] = useState(false);
    const [open, setOpen] = useState(null);
    const [isLiked, setIsLiked] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {   
        api.getPostData(postID)
            .then (data => {
                setPostData(data);
                setPostAuthor(data.author);
                if (data.author._id === currentUser._id) {
                    setMe(true)
                } 
                if (data.likes.some(id => id === currentUser._id)) {
                    setIsLiked(true)
                }
                })
            .catch(err => console.log(err)) 
     }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
     function DeletPost() {
        handleClose()
        onPostDelete(postData._id)           
     }
     
     

     function handleClickButtonLike() {
    
        onPostLike(postData)
        isLiked ? setIsLiked(false) : setIsLiked(true)
     }


    return (
        <>
            <Grid container spacing={2} className={s.postPage}>
                    <Grid item xs={12} md={8} className={s.container}>
                    <CardMedia
                            component="img"
                            height="194"
                            image={postData.image}
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
                                    <IconButton onClick={handleClickOpen} aria-label="add to favorites">
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton onClick={handleClickOpen} aria-label="add to favorites">
                                        <EditIcon />
                                    </IconButton>
                                   </> 
                                : <></>
                                }
                                
                                <IconButton onClick={handleClickButtonLike} aria-label="add to favorites">
                                    <FavoriteIcon htmlColor={isLiked ? 'red': null}/>
                                </IconButton>
                                </>
                                }
                            title={postAuthor.name}
                            subheader={postAuthor.about}
                        />
                        <Typography variant="h6" color="black" onClick={handleClickOpen} className={s.title} textAlign='center'>
                        {postData.title}
                        </Typography>
                        <Typography paragraph textAlign="justify">{postData.text}</Typography>
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
        </>
    )
}