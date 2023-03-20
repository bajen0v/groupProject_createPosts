import { CssBaseline } from '@mui/material';
import { Container } from '@mui/system';
import { Date } from '../date';
import { Footer } from '../footer';
import { Header } from '../header';
import { PostList } from '../post-list';


// import s from './styles.module.css';


export function App() {
  return (
    <>
        <CssBaseline/>
        <Header/>
        <Container>
          <PostList/>
        </Container>
        <Footer/>
      </>
  );
};