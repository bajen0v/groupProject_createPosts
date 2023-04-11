import { CssBaseline } from '@mui/material';
import { useState } from 'react';
import api from '../../api';
import { UserContext } from '../context/context';
import { Footer } from '../footer';
import { Header } from '../header';
import { PostList } from '../post-list';
import { Route, Routes } from 'react-router-dom';
import PostPage from '../PostPage';
import { NotFound } from '../error-page';



export function App() {
  const pageSize =12;

  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [currentUser, setCurrentUser] = useState('');  
  
  function handleUserInfo(data) {
        
      api.getLogIn(data)
      .then((data) => {
        setCurrentUser(data.data);
      })
      .catch(err => console.log(err)) 
    }

  function handlePageData(from, to) {

    api.getPostList()
    .then(data => setPageData(data.slice(from,to)))       
    .catch(err => console.log(err))
  }

  function handlePostLike(post){
    const isLiked = post.likes.some(id => id === currentUser._id)
    
    api.changeLikePost(post._id, isLiked)
      .then(updatePost => {
          const updateLikesState = pageData.map(pageState => {
          return pageState._id === updatePost._id ? updatePost : pageState
        })
        setPageData(updateLikesState)
      })
  }

  function handlePostDelete(id) {
    const from = (page - 1) * pageSize;
    const to =(page - 1) * pageSize + pageSize;
    api.deleteUserPost(id)
    .then(handlePageData(from,to))
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
        onPostDelete: handlePostDelete
        }}>
      <Header/>      
      <Routes>
          <Route  path='/' element={<PostList currentUser={currentUser}/>}/>
          <Route path='/posts/:postID' element={<PostPage />} />
          <Route path='*' element={<NotFound/>}/>
      </Routes>  
      </UserContext.Provider>
      <Footer/>
    </>
  );
};