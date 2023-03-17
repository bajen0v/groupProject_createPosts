import { Grid } from '@mui/material';
import {postData} from '../../posts';
import { Post } from '../post';

import s from './styles.module.css';

export function PostList() {
    return (
        <Grid container spacing={4} className={s.content__posts}>
            {postData.map((dataItem, index) => <Post key={index} {...dataItem} />)}
        </Grid> 
    )
}