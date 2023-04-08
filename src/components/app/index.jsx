import { CssBaseline } from '@mui/material';
import { useState } from 'react';
import api from '../../api';
import { UserContext } from '../context/context';
import { Footer } from '../footer';
import { Header } from '../header';
import { PostList } from '../post-list';



export function App() {
  const pageSize=12;
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [currentUser, setCurrentUser] = useState('');
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI4ZTQiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ2LCJleHAiOjE3MTAzMzg0NDZ9.BSjB0YkM8SKyUHfrK25KEHQsmBpJi8zCuhddzkP4eT8');
  
  
  function handleUserInfo(data) {
        
      api.getLogIn(data)
      .then((data) => {
        setCurrentUser(data.data);
        setToken(data.token);
      })
      .catch(err => console.log(err)) 
    }

  function handlePageData(from, to) {

    api.getPostList(token)
    .then(data => setPageData(data.slice(from,to)))       
    .catch(err => console.log(err))
  }

  function handlePostLike(post){
    const isLiked = post.likes.some(id => id === currentUser._id)
    

    api.changeLikePost(post._id, isLiked)
      .then(updatePost => {
        console.log('updatePost',updatePost)
        const updateLikesState = pageData.map(pageState => {
          console.log(pageState._id === updatePost._id)
          return pageState._id === updatePost._id ? updatePost : pageState
        })
        setPageData(updateLikesState)
      })
  }

  return (
    <>
      <CssBaseline/>
      <UserContext.Provider value={{
        currentUser, 
        token,  
        onUpdateUserId: handleUserInfo, 
        onUpdateUserName: setCurrentUser, 
        pageData, 
        UpdatePageData: handlePageData, 
        page, 
        onPage: setPage, 
        pageSize,
        onPostLike:handlePostLike
        }}>
      <Header/>      
      <PostList currentUser={currentUser}/>
      </UserContext.Provider>
      <Footer/>
    </>
  );
};