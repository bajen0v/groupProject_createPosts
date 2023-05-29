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
  const [currentUser, setCurrentUser] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [LoginOpen, setLoginOpen] = useState(false)
  const [postPage, setPostPage] = useState([])
  const [postData, setPostData] = useState()
  const [page, setPage] = useState(1)
  const [allUsers, setAllUsers] = useState()
  const [allTags, setAllTags] = useState([])

  useEffect(() => {
    localStorage.getItem('token') ? AgainMe() : setCurrentUser('')

    function AgainMe () {
      api.getUserMe(localStorage.getItem('token'))
        .then(data => setCurrentUser(data))
    }
  }, [])

  function AskForPostData () {
    setIsLoading(true)
    api.getPostList()
      .then(data => {
        data.forEach(element => {
          element.tags = element.tags.map(el => el.toLowerCase().trim())
        })
        setPostData(data)
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) })
  }

  useEffect(() => {
    let allTagsArray = []
    postData?.forEach(post => {
      post.tags.forEach(tag => {
        if (tag !== '') { allTagsArray.push(tag) }
      })
    })
    allTagsArray = allTagsArray?.filter((number, index, numbers) => {
      return numbers.indexOf(number) === index
    })
    setAllTags(allTagsArray)
  }, [postData])

  useEffect(() => {
    api.getAllUsers()
      .then((data) => {
        setAllUsers(data)
      })
      .catch(err => console.log(err))
  }, [])

  function handlePostLike (post) {
    const isLiked = post.likes.some(id => id === currentUser?._id)

    api.changeLikePost(post._id, isLiked)
      .then(updatePost => {
        updatePost.comments.reverse()
        updatePost.tags = updatePost.tags.map(el => el.toLowerCase().trim())
        const updateAll = postData?.map(pageState => {
          return pageState._id === updatePost._id ? updatePost : pageState
        })
        setPostData(updateAll)
        setPostPage(updatePost)
      })
  }

  function handlePostDelete (id) {
    setIsLoading(true)
    api.deleteUserPostAndUpdate(id)
      .then(data => {
        data.forEach(element => {
          element.tags = element.tags.map(el => el.toLowerCase().trim())
        })
        setPostData(data)
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) })
  }

  function handleEditPost (newPostData, postId) {
    newPostData.tags = newPostData.tags.split(',')
    for (const key in newPostData) { // проверка на пустые значения в объекте
      if (!newPostData[key]) delete newPostData[key]
    }
    setIsLoading(true)
    api.editUserPost(newPostData, postId)
      .then((updateState) => {
        updateState.comments.reverse()
        updateState.tags = updateState.tags.map(el => el.toLowerCase().trim())
        setPostPage(updateState)
        const NewPostData = postData.map(post => {
          if (post._id === updateState._id) {
            post = updateState
            return post
          }
          return post
        })
        NewPostData.forEach(element => {
          element.tags = element.tags.map(el => el.toLowerCase().trim())
        })
        setPostData(NewPostData)
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) })
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
        handlePostLike,
        handlePostDelete,
        postPage,
        setPostPage,
        handleEditPost,
        isLoading,
        setIsLoading,
        LoginOpen,
        handleLoginOpen,
        postData,
        setPostData,
        page,
        setPage,
        allUsers,
        allTags,
        AskForPostData
      }}>
      <Header />
      <Routes>
          <Route path='/' element={<PostList />}/>
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
