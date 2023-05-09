import { Container, Grid, Pagination } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import api from '../../api';

import { Post } from '../post/index'
import { UserContext } from '../../context/user-context';
import { Circle } from '../../components/isLoading';

import s from './styles.module.css';

export function PostList({SetFooterFixed}) {
    const { pageData, UpdatePageData, page, onPage, onPostLike, currentUser, pageSize, isLoading  } = useContext(UserContext);

    const [postData, setPostData] = useState([]);

    useEffect(() => {   
        api.getPostList()
        .then((data) => {
            setPostData(data);
        })       
        .catch(err => console.log(err))
        .finally(() => { SetFooterFixed(false) })
    },[]);

    useEffect(() => {   
        const from = (page - 1) * pageSize;
        const to =(page - 1) * pageSize + pageSize;

        UpdatePageData(from,to)
                  
        window.scrollTo(0,0)  
    },[page]);
    
    return ( 
        <>
            {isLoading
            ? <Circle />
            : <Container >
                <Grid container spacing={4} className={s.content__posts} >
                    {pageData.map((dataItem) => <Post key={dataItem._id} {...dataItem} onPostLike={onPostLike} currentUser={currentUser} />)}
                </Grid> 
                <Box justifyContent={"center"} alignItems={"center"} display={"flex"} sx={{margin: "20px 0px"}}>
                    <Pagination
                    color="primary"
                    count={Math.ceil(postData.length / pageSize)}
                    page={page}
                    onChange={(_, num) => onPage(num)}
                    />
                </Box>
            </ Container>}  
        </>
    )
}