import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EditIcon from '@mui/icons-material/Edit'
import { Avatar, AvatarGroup, Box, Button, ButtonGroup, CardHeader, CardMedia, Grid, Typography } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import api from '../../api'
import { UserContext } from '../../context/user-context'
import { Circle } from '../../components/isLoading'
import { EditPost } from '../../components/edit-post'
import { Comments } from '../../components/comments'
import { AddComments } from '../../components/add-comments'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'

import s from './styles.module.css'
import { Tag } from '../../components/tag'

export default function PostPage () {
  const { postID } = useParams()
  const { currentUser, handlePostDelete, handlePostLike, postPage, setPostPage, isLoading, setIsLoading, handleLoginOpen, allUsers } = useContext(UserContext)
  const [me, setMe] = useState(false)
  const [open, setOpen] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const navigate = useNavigate()
  const [openEdit, setOpenEdit] = useState()
  const [whoLikes, setWhoLikes] = useState()

  useEffect(() => {
    setIsLoading(true)
    api.getPostData(postID)
      .then((postdata) => {
        postdata.comments.reverse()
        postdata.tags = postdata.tags.map(el => el.toLowerCase().trim())
        setPostPage(postdata)
        if (postdata.author._id === currentUser?._id) {
          setMe(true)
        };
        if (postdata.likes.some(id => id === currentUser?._id)) {
          setIsLiked(true)
        };
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false)
        !currentUser && setMe(false)
        !currentUser && setIsLiked(false)
      })
  }, [currentUser])

  useEffect(() => {
    const whoLikesArray = []
    postPage?.likes?.forEach(element => {
      allUsers?.forEach(user => {
        if (user._id === element) {
          whoLikesArray.push(user)
        }
      })
    })

    setWhoLikes(whoLikesArray)
  }, [postPage])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClickOpenEdit = () => {
    setOpenEdit(true)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function DeletPost () {
    handleClose()
    handlePostDelete(postPage._id)
  }

  function handleClickButtonLike () {
    handlePostLike(postPage)
    isLiked ? setIsLiked(false) : setIsLiked(true)
  }

  const handleAuthorisation = () => {
    handleLoginOpen(true)
  }

  return (
        <>
            {isLoading
              ? <Circle />
              : <>
                    <Grid container spacing={2} className={s.postPage}>
                        <Grid item xs={12} md={8} className={s.container}>
                            <CardMedia
                                component="img"
                                height="194"
                                image={postPage.image}
                                alt="Картинка"
                                className={s.post_img}
                            />
                            <Tag tags={postPage.tags}/>
                            <Button variant="contained" onClick={() => navigate(-1)} className={s.back_button}>Назад</Button>
                            </Grid>
                            <Grid item xs={12} md={4} >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        sx={{ width: 56, height: 56 }}
                                        src={postPage?.author?.avatar}
                                        alt="Аватар"
                                    />
                                }
                                action={
                                    <> {me
                                      ? <>
                                        <IconButton onClick={handleClickOpen} title='удалить'>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={handleClickOpenEdit} title='редактировать'>
                                            <EditIcon />
                                        </IconButton>
                                    </>
                                      : <></>
                                    }

                                    <IconButton onClick={currentUser === '' ? handleAuthorisation : handleClickButtonLike} aria-label="add to favorites">
                                        <FavoriteIcon htmlColor={isLiked ? 'red' : null}/>{postPage?.likes?.length !== 0 ? postPage?.likes?.length : <></>}
                                    </IconButton>
                                    </>
                                    }
                                title={postPage?.author?.name}
                                subheader={postPage?.author?.about}
                            />
                            <Box >
                              {whoLikes
                                ? <>
                                <AvatarGroup max={6}>
                                {whoLikes?.map((element) =>
                                <Avatar key={element._id} src={element.avatar} onClick={() => navigate(`/userPosts/${element._id}`)} title={element.name + ' (' + element.about + ')'}/>)}
                                </AvatarGroup>
                                </>
                                : <HeartBrokenIcon/>
                              }
                            </Box>
                            <Typography variant="h6" color="black" className={s.title} textAlign='center'>
                                {postPage.title}
                            </Typography>
                            <Typography paragraph textAlign="justify" >
                                {postPage.text}
                            </Typography>
                            <AddComments />
                            {postPage?.comments === 0
                              ? <></>
                              : <>
                                {postPage?.comments?.map((element) => <Comments key={element._id} {...element} />)}
                            </>}
                        </Grid>
                    </Grid>
                    <Box className={open ? s.popup_aktive : s.invisible} onMouseDown={handleClose}>
                        <Box className={s.popup_container} onMouseDown={(e) => e.stopPropagation()}>
                            <Button>
                                <CancelIcon onClick={handleClose} className={s.close}/>
                            </Button>
                            <Typography variant="h5" color="black">
                                Удалить?
                            </Typography>
                            <ButtonGroup className={s.button} variant="contained" disableElevation aria-label="outlined primary button group">
                                <Link to={'/'}>
                                    <Button sx={{ m: 2 }} onClick={DeletPost}>Да</Button>
                                </Link>
                                <Button sx={{ m: 2 }} onClick={handleClose}>Нет</Button>
                            </ButtonGroup>
                        </Box>
                    </Box>

                    <Box className={ openEdit ? s.popup_edit_active : s.popup_edit_invisible}>
                        <EditPost closePopup={handleCloseEdit}/>
                    </Box>
                </>
            }
        </>
  )
}
