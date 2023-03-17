import s from './styles.module.css'

import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


export function Header() {
    return (
        <header className={s.header}>      
          <AppBar position="static">
           <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} className={s.Typography}>
              Блог обо всем на свете
            </Typography>
            <Button variant="contained" onClick={() => {alert('контакт есть');}}>
             <AddIcon/>
            </Button> 
            <Button variant="contained" onClick={() => {alert('логин работает');}}>
             Login
            </Button> 
           </Toolbar>
          </AppBar>
        </header> 
    )
}