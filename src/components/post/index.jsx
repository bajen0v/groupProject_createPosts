import * as React from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Date } from '../date';
import { Tag } from '../tag';
import PostPoupFull from '../post-popup';


import s from './styles.module.css'

export function Post ({onProductLike, likes, _id, ...props}) {
    function handleClickButtonLike() {
        onProductLike({likes, _id})
    }

    return (

        <Grid sx={{display: 'flex'}} justifyContent="center" item xs={12} sm={6} md={4}>
            <Card className={s.card} sx={{ width: 345 }} >
                <CardHeader
                    avatar={
                        <Avatar
                            sx={{ width: 56, height: 56}}
                            src={props.author.avatar}
                            alt="Аватар"
                        />
                    }
                    action={
                        <IconButton aria-label="add to favorites" onClick={handleClickButtonLike}>
                            <FavoriteIcon />
                        </IconButton>
                    }
                    title={props.author.name}
                    subheader={props.author.about}
                />
                
                <PostPoupFull {...props}/>
                <CardContent>
                    <Typography variant="h6" color="black">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="right">
                        <Date created_at={props.created_at}/>
                    </Typography>
                    <Tag tags={props.tags}/>
                </CardContent>                
            </Card>

        </Grid>
    
    );
}