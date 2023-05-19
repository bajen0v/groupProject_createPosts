import { Button, Container, Grid } from '@mui/material'
import { useContext, useEffect } from 'react'

import { Post } from '../../components/post/index'
import { UserContext } from '../../context/user-context'
import { Circle } from '../../components/isLoading'

import s from './styles.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api'

export function UserPosts () {
  const navigate = useNavigate()
  const { userID } = useParams()
  const { currentUser, isLoading, setIsLoading, userPostPage, setUserPostPage } = useContext(UserContext)

  useEffect(() => {
    setIsLoading(true)
    api.getPostList()
      .then(data => {
        setUserPostPage(data.filter(e => e.author._id === userID))
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) })
  }, [currentUser, userID])

  return (
        <>
            {isLoading
              ? <Circle sx={{ height: 90 }} />
              : <Container className={s.content__posts}>
                <Button variant="contained" onClick={() => navigate(-1)}>Назад</Button>
                <Grid container spacing={4} className={s.mypost}>
                    {userPostPage?.map((dataItem) => <Post key={dataItem._id} {...dataItem} />)}
                </Grid>
            </ Container>}
        </>
  )
}
