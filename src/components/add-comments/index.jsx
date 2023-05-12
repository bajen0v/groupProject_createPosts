/* eslint-disable react/no-unknown-property */
import { useContext } from 'react'
import Avatar from '@mui/material/Avatar'
import { CardHeader, IconButton, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useParams } from 'react-router-dom'

import api from '../../api'
import { UserContext } from '../../context/user-context'

import s from './styles.module.css'

export function AddComments () {
  const { currentUser, needLogin, setPostPage } = useContext(UserContext)
  const { postID } = useParams()
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = (data) => {
    currentUser === ''
      ? needLogin(true)
      : api.setComments(data, postID)
        .then((data) => setPostPage(data))
    reset()
  }

  return (<>
        <CardHeader
            avatar={
            <Avatar
            sx={{ width: 56, height: 56 }}
            src={currentUser.avatar}
            alt="Аватар"
            />
            }
            subheader={<form onSubmit={handleSubmit(onSubmit)} sx={4} >
            <TextField label="Написать комментарий..." {...register('text', { required: true })} className={s.text} />
            <IconButton type="submit" color="primary"><ArrowForwardIosIcon/></IconButton>
            </form>}
        />
        </>
  )
}
