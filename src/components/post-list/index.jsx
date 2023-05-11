import { Container, Grid, Pagination } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import api from '../../api';

import { Post } from '../post/index'
import { UserContext } from '../../context/user-context';
import { Circle } from '../../components/isLoading';

import s from './styles.module.css';

export function PostList({SetFooterFixed, count}) {
    const { pageData, UpdatePageData, page, onPage, onPostLike, currentUser, isLoading  } = useContext(UserContext);

    useEffect(() => {   
      UpdatePageData() 
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
                    count={count}
                    page={page}
                    onChange={(_, num) => onPage(num)}
                    />
                </Box>
            </ Container>}  
        </>
    )
}