import * as React from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Date } from '../date';
import { Tag } from '../tag';
import PostPoupFull from '../post-popup';


import s from './styles.module.css'

export function Post ({...props}) {

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
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                    }
                    title={props.author.name}
                    subheader={props.author.about}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={props.image}
                    alt="Картинка"
                />
                <CardContent>
                    <PostPoupFull {...props}/>
                    <Typography variant="body2" color="text.secondary" align="right">
                        <Date created_at={props.created_at}/>
                    </Typography>
                    <Tag tags={props.tags}/>
                </CardContent>                
            </Card>

        </Grid>
    
    );
}