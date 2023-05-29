import { Box, Button, Grid } from '@mui/material'
import { useContext, useEffect, useState } from 'react'

import { Post } from '../../components/post/index'
import { UserContext } from '../../context/user-context'
import { Circle } from '../../components/isLoading'

import s from './styles.module.css'
import { useNavigate, useParams } from 'react-router-dom'

export function UserPosts () {
  const navigate = useNavigate()
  const { userID } = useParams()
  const [userPostPage, setUserPostPage] = useState([])
  const { isLoading, postData, AskForPostData } = useContext(UserContext)

  useEffect(() => {
    postData
      ? setUserPostPage(postData?.filter(e => e.author._id === userID))
      : AskForPostData()
  }, [postData, userID])

  return (
        <>
            {isLoading
              ? <Circle sx={{ height: 90 }} />
              : <Box className={s.content__posts}>
                <Button variant="contained" onClick={() => navigate(-1)}>Назад</Button>
                <Grid container spacing={4} className={s.mypost}>
                    {userPostPage?.map((dataItem) => <Post key={dataItem._id} {...dataItem} />)}
                </Grid>
            </ Box>}
        </>
  )
}
