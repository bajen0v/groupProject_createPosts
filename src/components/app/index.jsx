import { CssBaseline } from '@mui/material';
import { useState } from 'react';
import api from '../../api';
import { Footer } from '../footer';
import { Header } from '../header';
import { PostList } from '../post-list';



export function App() {
  const [currentUser, setCurrentUser] =useState('');

  function handleUserInfo(newID) {
    api.getUsersInfo(newID)
      .then(data => setCurrentUser(data))
      .catch(err => console.log(err)) 
      
      api.getUsersInfo(newID) //Для получения списка пользователей в консоли, отправить пустой id
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  /*{api.getUsersInfo("62632524438a77ca8f2876cc") 622bd81b06c7d323b8ae4614
  .then(data => console.log(data))
  .catch(err => console.log(err))}*/



  return (
    <>
      <CssBaseline/>
      <Header user={currentUser} onUpdateIserId={handleUserInfo}/>      
      <PostList/>
      <Footer/>
    </>
  );
};