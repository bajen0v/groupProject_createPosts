/* eslint-disable react/prop-types */
import { Box, Button, ButtonGroup, CardActions, CardMedia, Grid } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'
import { useContext, useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ChatIcon from '@mui/icons-material/Chat'

import { UserContext } from '../../context/user-context'
import { Date } from '../date'
import { Tag } from '../tag'
import { EditPost } from '../edit-post'

import s from './styles.module.css'

export function Post ({ ...props }) {
  const { currentUser, onPostDelete, onPostLike, needLogin } = useContext(UserContext)
  const [me, setMe] = useState(false)
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(null)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (props.author._id === currentUser._id) {
      setMe(true)
    }
  })

  function DeletPost () {
    handleClose()
    onPostDelete(props._id)
  }

  const isLiked = props.likes.some(id => id === currentUser._id)

  function handleClickButtonLike () {
    onPostLike({ ...props })
  }

  const handleAuthorisation = () => {
    needLogin(true)
  }

  const handleClickOpenEdit = () => {
    setOpenEdit(true)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  return (
    <>
        <Grid sx={{ display: 'flex' }} justifyContent="center" item xs={12} sm={6} md={4}>
            <Card className={s.card} sx={{ width: 345 }} >
                <CardHeader sx={{ height: 100 }}
                    avatar={
                        <Avatar
                            sx={{ width: 56, height: 56 }}
                            src={props.author.avatar}
                            alt="Аватар"
                        />
                    }
                    action={
                    <> {me
                      ? <>
                        <IconButton onClick={handleClickOpen} aria-label="add to favorites">
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={handleClickOpenEdit}>
                            <EditIcon />
                        </IconButton>
                    </>
                      : <></>}

                    <IconButton sx={{ borderRadius: '16px' }} onClick={currentUser === '' ? handleAuthorisation : handleClickButtonLike} aria-label="add to favorites">
                        <FavoriteIcon htmlColor={isLiked ? 'red' : null}/>
                        {props.likes.length !== 0
                          ? (<Box level="body3"
                                sx={isLiked
                                  ? {
                                      paddingLeft: 0.5,
                                      color: 'red',
                                      fontSize: 25,
                                      fontWeight: 'bold',
                                      borderRadius: '50%'
                                    }
                                  : {
                                      fontSize: 25,
                                      paddingLeft: 0.5,
                                      borderRadius: '50%'
                                    }}>
                        {props.likes.length}</Box>)
                          : null}
                    </IconButton>
                    </>
                    }
                    title={props.author.name}
                    subheader={
                        <>
                            <Typography variant="body2" color="text.secondary" align="left">
                                {props.author.about}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" align="left">
                                <Date created_at={props.created_at}/>
                            </Typography></>
                        }
                />

                <Link to={`/posts/${props._id}`} className={s.text}>
                    <CardMedia
                        component="img"
                        height="194"
                        image={props.image}
                        alt="Картинка"
                        className={s.post_img}
                    />
                    <CardContent>
                        <Typography variant="h6" color="black" textAlign='center' className={s.post__title}>
                            {props.title}
                        </Typography>
                        <Tag tags={props.tags}/>
                    </CardContent>
                </Link>
                <CardActions disableSpacing className={s.chat}>
                    {props.comments.length === 0
                      ? <IconButton className={s.chat}><ChatBubbleOutlineIcon /></IconButton>
                      : <IconButton className={s.chat}><ChatIcon />{props.comments.length}</IconButton>}
                </CardActions>
            </Card>

        </Grid>
        <Box className={open ? s.popup_aktive : s.invisible} onMouseDown={handleClose}>
            <Box className={s.popup_container} onMouseDown={(e) => e.stopPropagation()}>
                <Button ><CancelIcon onClick={handleClose} className={s.close}/> </Button>
                <Typography variant="h5" color="black">Удалить?</Typography>
                <ButtonGroup className={s.button} variant="contained" disableElevation aria-label="outlined primary button group">
                    <Button sx={{ m: 2 }} onClick={DeletPost}>Да</Button>
                    <Button sx={{ m: 2 }} onClick={handleClose}>Нет</Button>
                </ButtonGroup>
            </Box>
        </Box>
        <Box className={openEdit ? s.popup_edit_active : s.popup_edit_invisible} onMouseDown={handleCloseEdit}>
            <EditPost closePopup={handleCloseEdit} id={props._id} title={props.title} text={props.text} image={props.image} tags={props.tags}/>
        </Box>
        </>
  )
}
