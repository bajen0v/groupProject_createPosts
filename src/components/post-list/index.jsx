import { Container, Grid, Pagination } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import api from '../../api';
import s from './styles.module.css';
import { Post } from '../post/index'



export function PostList() {

    const pageSize=12;

    const [postData, setPostData] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {

        api.getPostList()
            .then(data => setPostData(data))       
            .catch(err => console.log(err))
  
    },[]);

    useEffect(() => {   
        const from = page * pageSize;
        const to =page * pageSize + pageSize;

        api.getPostList()
            .then(data => setPageData(data.slice(from,to)))       
            .catch(err => console.log(err))

        window.scrollTo(0,0)  
    },[page]);

      
    return (
        <Container>
            <Grid container spacing={4} className={s.content__posts}>
                {pageData.map((dataItem, index) => <Post key={index} {...dataItem} />)}
            </Grid> 
            <Box justifyContent={"center"} alignItems={"center"} display={"flex"} sx={{margin: "20px 0px"}}>
                <Pagination
                color="primary"
                count={Math.ceil(postData.length / pageSize)}
                page={page}
                onChange={(_, num) => setPage(num)}
                />
            </Box>
        </ Container>
    )
}