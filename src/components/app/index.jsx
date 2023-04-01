import { CssBaseline } from '@mui/material';
import { useState } from 'react';
import api from '../../api';
import { UserContext } from '../context/context';
import { Footer } from '../footer';
import { Header } from '../header';
import { PostList } from '../post-list';



export function App() {
  const [currentUser, setCurrentUser] =useState('');
  const [token, setToken]=useState('');
  
  function handleUserInfo(newID, newtoken) {
        setToken(newtoken)
         api.getUserInfo(newID, newtoken)
            .then(data => setCurrentUser(data))
            .catch(err => console.log(err))   
    }


  return (
    <>
      <CssBaseline/>
      <UserContext.Provider value={{currentUser, token,  onUpdateUserId: handleUserInfo, onUpdateUserName: setCurrentUser}}>
      <Header/>      
      <PostList/>
      </UserContext.Provider>
      <Footer/>
    </>
  );
};