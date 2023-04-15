import { useContext, useState } from 'react';
import { UserContext } from '../context/context';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Avatar, Box, CardMedia } from '@mui/material';
import { Tag } from '../tag';
import { Date } from '../date';

import s from './styles.module.css'
import api from '../../api';

const PostPopup = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function PostPopupTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

PostPopupTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function PostPoupFull({title, ...props}) {
    const { currentUser, onPostLike} = useContext(UserContext);
    const [open, setOpen] = useState(false);
    

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const isLiked = props.likes.some(id => id === currentUser._id)

    function handleClickButtonLike() {
   
       onPostLike({...props})
    }

    return (
        <div>
            <CardMedia
                    component="img"
                    height="194"
                    image={props.image}
                    alt="Картинка"
                    onClick={handleClickOpen}
                    className={s.post_img}
            />
            <PostPopup
                currentUser={currentUser}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <PostPopupTitle id="customized-dialog-title" onClose={handleClose}>
                    <div className={s.header}>
                        <div className={s.authorInfo}>
                            <Avatar
                                sx={{ width: 60, height: 60}}
                                src={props.author.avatar}
                                alt="Аватар"
                            />
                            <div className={s.author}>
                                <div className={s.authorName}>{props.author.name}</div>
                                <div className={s.authorAbout}>{props.author.about}</div>
                            </div>
                        </div>         
                        <Typography variant="body2" color="text.secondary" align="right" className={s.date}>
                            <Date created_at={props.created_at}/>
                        </Typography>
                    </div>
                </PostPopupTitle>
                <DialogContent /* dividers */>
                    <img src={props.image} alt="Картинка поста" className={s.image}/>
                    <Typography variant="h6" color="black" onClick={handleClickOpen} className={s.title}>
                        {title}
                    </Typography>
                    <Typography paragraph>{props.text}</Typography>
            
                </DialogContent>
                <DialogContent>
                    <div className={s.tagIcon}>
                        <IconButton onClick={handleClickButtonLike} aria-label="add to favorites">
                            <FavoriteIcon htmlColor={isLiked ? 'red': null}/>
                            {props.likes.length !== 0 
                            ?(<Box level="body3" 
                                    sx={isLiked 
                                        ? {
                                            paddingLeft: 0.5,            
                                            color: 'red',
                                            fontSize: 25,
                                            fontWeight: 'bold',
                                            borderRadius: '50%',} 
                                        : {            
                                            fontSize: 25,
                                            paddingLeft: 0.5,
                                            borderRadius: '50%',
                                        }}>{props.likes.length}
                                </Box>)  
                            : null}       
                        </IconButton>
                        <Tag tags={props.tags}/>
                    </div>                    
                </DialogContent>
            </PostPopup>
        </div>
    );
}