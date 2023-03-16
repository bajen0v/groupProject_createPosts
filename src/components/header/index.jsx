import { AppBar, Button, Toolbar, Typography } from "@mui/material";

import s from './styles.module.css'

export function Header() {
    return (
        <header className={s.header}>      
          <AppBar position="static">
            <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Блог обо всем на свете
            </Typography>
            <Button 
            variant = "contained" 
            onClick = {() => {
              alert('контакт есть');
              }
            }
            >Создать пост
            </Button> 
            <Button 
            variant="contained" 
            onClick={() => {
              alert('логин работает');
              }
            }>Login
            </Button> 
            </Toolbar>
          </AppBar>  
        </header> 
    )
}