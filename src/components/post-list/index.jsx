import { Grid, Pagination } from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useEffect, useState } from 'react'

import { Post } from '../post/index'
import { UserContext } from '../../context/user-context'
import { Circle } from '../../components/isLoading'

import s from './styles.module.css'
import api from '../../api'

export function PostList () {
  const { isLoading, postData, setIsLoading, setPostData, page, setPage } = useContext(UserContext)
  const [count, setCount] = useState()
  const [pageData, setPageData] = useState([])
  const pageSize = 12

  useEffect(() => {
    const from = (page - 1) * pageSize
    const to = (page - 1) * pageSize + pageSize
    setIsLoading(true)
    api.getPostList()
      .then(data => {
        data.forEach(element => {
          element.tags = element.tags.map(el => el.toLowerCase().trim())
        })
        setCount(Math.ceil(data.length / pageSize))
        setPostData(data)
        setPageData(data.slice(from, to))
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) })
    window.scrollTo(0, 0)
  }, [page])

  useEffect(() => {
    setIsLoading(true)
    const from = (page - 1) * pageSize
    const to = (page - 1) * pageSize + pageSize
    setPageData(postData?.slice(from, to))
    setIsLoading(false)
  }, [postData])

  function handlePage (num) {
    setPage(num)
    setIsLoading(true)
  }

  return (
        <>
            {isLoading
              ? <Circle sx={{ height: 90 }} />
              : < >
                <Grid container spacing={4} className={s.content__posts} >
                    {pageData?.map((dataItem) => <Post key={dataItem._id} {...dataItem} />)}
                </Grid>
                <Box justifyContent={'center'} alignItems={'center'} display={'flex'} sx={{ margin: '20px 0px' }}>
                    <Pagination
                    color="primary"
                    count={count}
                    page={page}
                    onChange={(_, num) => handlePage(num)}
                    />
                </Box>
            </ >}
        </>
  )
}
