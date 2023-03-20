import { Grid } from '@mui/material';
import { useState } from 'react';
//import {postData} from '../../posts';
import AppPagination from '../pagination';
import { Post } from '../post';

import s from './styles.module.css';



export function PostList() {

    const [postData, SetpostData] = useState([]);
    
    return (
        <>
        <Grid container spacing={4} className={s.content__posts}>
            {postData.map((dataItem, index) => <Post key={index} {...dataItem} />)}
        </Grid> 
        <AppPagination SetpostData ={(p) => SetpostData(p)}/>
        </>
    )
}