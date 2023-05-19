import { CssBaseline } from '@mui/material'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import api from '../../api'
import { UserContext } from '../../context/user-context'
import { Footer } from '../footer'
import { Header } from '../header'
import { PostList } from '../post-list'
import PostPage from '../../pages/post-page'
import { NotFound } from '../../pages/not-found-page'
import { UserPosts } from '../../pages/User-posts'
import { TagPage } from '../../pages/tag-page'

export function App () {
  const pageSize = 12
  const [pageData, setPageData] = useState([])
  const [page, setPage] = useState(1)
  const [currentUser, setCurrentUser] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [LoginOpen, setLoginOpen] = useState(false)
  const [postPage, setPostPage] = useState([])
  const [userPostPage, setUserPostPage] = useState([])
  const [count, setCount] = useState()
  const [postData, setPostData] = useState()

  useEffect(() => {
    localStorage.getItem('token') ? AgainMe() : setCurrentUser('')

    function AgainMe () {
      api.getUserMe(localStorage.getItem('token'))
        .then(data => setCurrentUser(data))
    }
  }, [])

  function handlePageData () {
    const from = (page - 1) * pageSize
    const to = (page - 1) * pageSize + pageSize
    setIsLoading(true)
    api.getPostList()
      .then(data => {
        setCount(Math.ceil(data.length / pageSize))
        setUserPostPage(data.filter(e => e.author._id === currentUser._id))
        setPostData(data)
        setPageData(data.slice(from, to))
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) })
  }

  function handlePostLike (post) {
    const isLiked = post.likes.some(id => id === currentUser?._id)

    api.changeLikePost(post._id, isLiked)
      .then(updatePost => {
        const updateLikesState = pageData.map(pageState => {
          return pageState._id === updatePost._id ? updatePost : pageState
        })
        const updatemystate = userPostPage.map(pageState => {
          return pageState._id === updatePost._id ? updatePost : pageState
        })
        const updateAll = postData?.map(pageState => {
          return pageState._id === updatePost._id ? updatePost : pageState
        })
        setPageData(updateLikesState)
        setPostData(updateAll)
        setUserPostPage(updatemystate)
        setPostPage(updatePost)
      })
  }

  function handlePostDelete (id) {
    const from = (page - 1) * pageSize
    const to = (page - 1) * pageSize + pageSize
    api.deleteUserPostAndUpdate(id)
      .then(data => {
        setUserPostPage(data.filter(e => e.author._id === currentUser._id))
        setPageData(data.slice(from, to))
        setPostData(data)
      })
      .catch(err => console.log(err))
  }

  function handleEditPost (newPostData, postId) {
    newPostData.tags = newPostData.tags.split(',')
    for (const key in newPostData) { // проверка на пустые значения в объекте
      if (!newPostData[key]) delete newPostData[key]
    }

    api.editUserPost(newPostData, postId)
      .then(data => {
        setPostPage(data)
        handlePageData()
      })
      .catch(err => console.log(err))
  }

  const handleLoginOpen = (event) => {
    setLoginOpen(event)
  }

  return (
    <>
      <CssBaseline/>
      <UserContext.Provider value={{
        currentUser,
        setCurrentUser,
        pageData,
        setPageData,
        UpdatePageData: handlePageData,
        page,
        onPage: setPage,
        pageSize,
        onPostLike: handlePostLike,
        onPostDelete: handlePostDelete,
        postPage,
        setPostPage,
        handleEditPost,
        isLoading,
        setIsLoading,
        LoginOpen,
        needLogin: handleLoginOpen,
        userPostPage,
        setUserPostPage,
        postData,
        setPostData
      }}>
      <Header/>
      <Routes>
          <Route path='/' element={<PostList count={count} />}/>
          <Route path='/posts/:postID' element={<PostPage />} />
          <Route path='/userPosts/:userID' element={<UserPosts />} />
          <Route path='/sort/:tag' element={<TagPage />} />
          <Route path='*' element={<NotFound/>}/>
      </Routes>
      </UserContext.Provider>
      <Footer />
    </>
  )
};
