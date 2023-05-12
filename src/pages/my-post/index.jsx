import { Button, Container, Grid } from '@mui/material'
import { useContext, useEffect } from 'react'

import { Post } from '../../components/post/index'
import { UserContext } from '../../context/user-context'
import { Circle } from '../../components/isLoading'

import s from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import api from '../../api'

export function MyPost () {
  const navigate = useNavigate()
  const { currentUser, isLoading, setIsLoading, myPostPage, setMyPostPage } = useContext(UserContext)

  useEffect(() => {
    setIsLoading(true)
    api.getPostList()
      .then(data => {
        setMyPostPage(data.filter(e => e.author._id === currentUser._id))
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) })
  }, [currentUser])

  return (
        <>
            {isLoading
              ? <Circle />
              : <Container className={s.content__posts}>
                <Button variant="contained" onClick={() => navigate(-1)}>Назад</Button>
                <Grid container spacing={4} className={s.mypost}>
                    {myPostPage.map((dataItem) => <Post key={dataItem._id} {...dataItem} />)}
                </Grid>
            </ Container>}
        </>
  )
}
