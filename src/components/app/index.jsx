import { CssBaseline } from '@mui/material';
import { Footer } from '../footer';
import { Header } from '../header';
import { PostList } from '../post-list';


export function App() {
  return (
    <>
        <CssBaseline/>
        <Header/>      
        <PostList/>
        <Footer/>
      </>
  );
};