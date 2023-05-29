import { Box, Button, Grid } from '@mui/material'
import { useContext, useEffect, useState } from 'react'

import { Post } from '../../components/post/index'
import { UserContext } from '../../context/user-context'
import { Circle } from '../../components/isLoading'

import s from './styles.module.css'
import { useNavigate, useParams } from 'react-router-dom'

export function TagPage () {
  const navigate = useNavigate()
  const { tag } = useParams()
  const { isLoading, postData, AskForPostData } = useContext(UserContext)
  const [tagPage, setTagPage] = useState()

  useEffect(() => {
    postData
      ? setTagPage(postData?.filter(e => e.tags.includes(tag)))
      : AskForPostData()
  }, [postData, tag])

  return (
        <>
            {isLoading
              ? <Circle />
              : <Box className={s.content__posts}>
                  <Button variant="contained" onClick={() => navigate(-1)}>Назад</Button>
                  <Grid container spacing={4} className={s.mypost} >
                      {tagPage?.map((dataItem) => <Post key={dataItem._id} {...dataItem} item xs={12} sm={3} md={3}/>)}
                  </Grid>
            </ Box>}
        </>
  )
}
