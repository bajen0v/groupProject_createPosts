import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Box, CardHeader } from '@mui/material';
import { UserContext } from '../context/context';
import { useContext, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import s from './styles.module.css'
import { EditUser } from '../edit-user';
import { AddPost } from '../add-post';
import { EditAvatar } from '../edit-avatar';

export default function BasicMenu() {
const {currentUser, onUpdateUserName} = useContext(UserContext);
const [openEditUser, SetOpenEditUser] = useState(false)
const [openAddPost, SetOpenAddPost] = useState(false)
const [openEditAvatar, SetOpenEditAvatar] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleEditUser = () => {
      setAnchorEl(null);
      SetOpenEditUser(true)
    };

    const handleAddPost = () => {
      setAnchorEl(null);
      SetOpenAddPost(true)
    };

    const handleEditAvatar = () => {
      setAnchorEl(null);
      SetOpenEditAvatar(true)
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const popup = () => {
      SetOpenEditUser(false)
      SetOpenAddPost(false)
      SetOpenEditAvatar(false)
    };


  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar src={currentUser.avatar} alt= {currentUser.name[0]}/><KeyboardArrowDownIcon className={s.arrow} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
         <CardHeader
                    avatar={
                        <Avatar
                            sx={{ width: 56, height: 56}}
                            src={currentUser.avatar}
                            alt="Аватар"
                        />
                    }
                    title={currentUser.name}
                    subheader={currentUser.about}
                />
        <MenuItem onClick={handleEditUser} disableRipple>
        Редактировать данные
        </MenuItem>
        <MenuItem onClick={handleAddPost} disableRipple>
        Добавить пост
        </MenuItem>
        <MenuItem onClick={handleEditAvatar} disableRipple>
        Сменить аватар
        </MenuItem>
      </Menu>
      <Box className={openEditUser ? s.popup_aktive : s.invisible} >
        <EditUser closePopup={popup} />
      </Box>
      <Box className={openAddPost ? s.popup_aktive : s.invisible}>
        <AddPost closePopup={popup}/>
      </Box>
      <Box className={openEditAvatar ? s.popup_aktive : s.invisible}>
        <EditAvatar closePopup={popup}/>
      </Box>
    </div>
  );
}