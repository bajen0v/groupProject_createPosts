import * as React from 'react';
import { Box, Button, ButtonGroup, Grid, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Date } from '../date';
import { Tag } from '../tag';
import PostPoupFull from '../post-popup';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useEffect, useState } from 'react';
import s from './styles.module.css'
import { UserContext } from '../context/context';
import api from '../../api';
import CancelIcon from '@mui/icons-material/Cancel';


export function Post ({onPostLike, ...props}) {
    const { currentUser, page, pageSize, UpdatePageData} = useContext(UserContext);
    const[me, setMe] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    useEffect(() => {   
        if (props.author._id === currentUser._id) {
        setMe(true)
    } 
     });

     function DeletPost() {
        handleClose()
        const from = (page - 1) * pageSize;
        const to =(page - 1) * pageSize + pageSize;
        api.deleteUserPost(props._id)
        .then(data => UpdatePageData(from,to))
           
     }
     
     const isLiked = props.likes.some(id => id === currentUser._id)
     
     function handleClickButtonLike() {
    
        onPostLike({...props})
     }

    return (
    <>
        <Grid sx={{display: 'flex'}} justifyContent="center" item xs={12} sm={6} md={4}>
            <Card className={s.card} sx={{ width: 345 }} >
                <CardHeader
                    avatar={
                        <Avatar
                            sx={{ width: 56, height: 56}}
                            src={props.author.avatar}
                            alt="Аватар"
                        />
                    }
                    action={
                    <> {me 
                    ?<IconButton onClick={handleClickOpen} aria-label="add to favorites">
                        <DeleteIcon />
                    </IconButton>
                    : <></>}
                        
                        <IconButton onClick={handleClickButtonLike} aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                    </>
                    }
                    title={props.author.name}
                    subheader={props.author.about}
                    
                />
                
                <PostPoupFull {...props}/>
                <CardContent>
                    <Typography variant="h6" color="black">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="right">
                        <Date created_at={props.created_at}/>
                    </Typography>
                    <Tag tags={props.tags}/>
                </CardContent>   
                             
            </Card>

        </Grid>
        <Box className={open ? s.popup_aktive : s.invisible}>
            <Box className={s.popup_container}>
              <Button ><CancelIcon onClick={handleClose} className={s.close}/> </Button>
              <Typography variant="h5" color="black">Удалить?</Typography>
              <ButtonGroup className={s.button} variant="contained" disableElevation aria-label="outlined primary button group">
                <Button  sx={{ m: 2}} onClick={DeletPost}>Да</Button>
                <Button  sx={{ m: 2}} onClick={handleClose}>Нет</Button>
             </ButtonGroup>
            </Box>
        </Box>
        </>
    );
}