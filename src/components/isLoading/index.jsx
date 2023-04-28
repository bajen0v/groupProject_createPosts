import { CircularProgress, Container, Grid, Pagination } from '@mui/material';
import { Box } from '@mui/system';


import s from './styles.module.css'

export function Circle() {
        
    return (
            <Box sx={{ display: 'flex' }} className={s.circle}>
                <CircularProgress />
            </Box>
    )
}