import { CssBaseline } from '@mui/material';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import api from '../../api';
import { UserContext } from '../../context/user-context';
import { Footer } from '../footer';
import { Header } from '../header';
import { PostList } from '../post-list';
import PostPage from '../../pages/post-page';
import { NotFound } from '../../pages/not-found-page';

export function App() {
  const pageSize =12;

  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [currentUser, setCurrentUser] = useState('');  
  const [likeNumber, setLikeNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [footerFixed, setFooterFixed] = useState(true);

  const [postPage, setPostPage] = useState([]);
  
  function handleUserInfo(data) {
        
      api.getLogIn(data)
      .then((data) => {
        setCurrentUser(data.data);
      })
      .catch(err => console.log(err)) 
    }

  function handlePageData(from, to) {
    setIsLoading(true)
    setFooterFixed(true)
    api.getPostList()
    .then(data => setPageData(data.slice(from,to)))       
    .catch(err => console.log(err))
    .finally(() => { setIsLoading(false)})
    .finally(() => { setFooterFixed(false)})
  }

  function handlePostLike(post){
    const isLiked = post.likes.some(id => id === currentUser._id)
    
    api.changeLikePost(post._id, isLiked)
      .then(updatePost => {
          const updateLikesState = pageData.map(pageState => {
          return pageState._id === updatePost._id ? updatePost : pageState
        })
        setPageData(updateLikesState)
        setLikeNumber(updatePost.likes.length)
      })
  }

  function handlePostDelete(id) {
    const from = (page - 1) * pageSize;
    const to =(page - 1) * pageSize + pageSize;
    api.deleteUserPostAndUpdate(id)
    .then(data => setPageData(data.slice(from,to)))       
    .catch(err => console.log(err))
  }

  function handleEditPost(newPostData, postId) {
    for (let key in newPostData) { // проверка на пустые значения в объекте
      if (!newPostData[key]) delete newPostData[key];
    }
    newPostData.tags = newPostData.tags.split(', ') 
    api.editUserPost(newPostData, postId)
      .then(data => {
        setPostPage(data)
        const from = (page - 1) * pageSize;
        const to =(page - 1) * pageSize + pageSize;
        handlePageData(from, to)
      })
      .catch(err => console.log(err))
}

  return (
    <>
      <CssBaseline/>
      <UserContext.Provider value={{
        currentUser,   
        onUpdateUserId: handleUserInfo, 
        onUpdateUserName: setCurrentUser, 
        pageData, 
        UpdatePageData: handlePageData, 
        page, 
        onPage: setPage, 
        pageSize,
        onPostLike:handlePostLike,
        onPostDelete: handlePostDelete,
        postPage,
        setPostPage,
        handleEditPost,
        isLoading, 
        setIsLoading: setIsLoading
        }}>
      <Header/>      
      <Routes>
          <Route  path='/' element={<PostList currentUser={currentUser} handleEditPost={handleEditPost} SetFooterFixed={setFooterFixed}/>}/>
          <Route path='/posts/:postID' element={<PostPage likeNumber={likeNumber} setLikeNumber={setLikeNumber} />} />
          <Route path='*' element={<NotFound/>}/>
      </Routes>  
      </UserContext.Provider>
      <Footer footerFixed={footerFixed} SetFooterFixed={setFooterFixed}/>
    </>
  );
};