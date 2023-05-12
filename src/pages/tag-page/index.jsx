import { Button, Container, Grid } from '@mui/material'
import { useContext, useEffect, useState } from 'react'

import { Post } from '../../components/post/index'
import { UserContext } from '../../context/user-context'
import { Circle } from '../../components/isLoading'

import s from './styles.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api'

export function TagPage () {
  const navigate = useNavigate()
  const { tag } = useParams()
  const { currentUser, isLoading, setIsLoading, postData, setPostData } = useContext(UserContext)
  const [tagPage, setTagPage] = useState()

  useEffect(() => {
    setIsLoading(true)
    api.getPostList()
      .then(data => {
        setPostData(data)
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) })
  }, [currentUser])

  useEffect(() => {
    setTagPage(postData?.filter(e => e.tags.includes(tag)))
  }, [postData])

  return (
        <>
            {isLoading
              ? <Circle />
              : <Container className={s.content__posts}>
                  <Button variant="contained" onClick={() => navigate(-1)}>Назад</Button>
                  <Grid container spacing={4} className={s.mypost} >
                      {tagPage?.map((dataItem) => <Post key={dataItem._id} {...dataItem} />)}
                  </Grid>
            </ Container>}
        </>
  )
}
