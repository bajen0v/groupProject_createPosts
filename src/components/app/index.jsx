import { CssBaseline } from '@mui/material';
import { Container } from '@mui/system';
import { Footer } from '../footer';
import { Header } from '../header';
import { PostList } from '../post-list';

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