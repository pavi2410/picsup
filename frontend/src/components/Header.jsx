import { useState } from 'react';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
import { GoSearch } from 'react-icons/go';
import { useNavigate } from 'react-router';
import { useAuth } from '../auth';
import { Button, Menu, MenuItem } from '@mui/material'
import ImageUploadDialog from './ImageUploadDialog';
import DarkThemeToggle from './DarkThemeToggle';

export default function Header() {
  const navigate = useNavigate();
  const auth = useAuth()

  const [open2, setOpen2] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);

    const option = e.currentTarget.getAttribute('label')

    const options = {
      profile: () => navigate('/profile'),
      images: () => { navigate('/me/images') },
      logout: () => { logout() }
    }
    
    options[option]();
  };

  function logout() {
    window.localStorage.clear();
    window.location.reload();
  }

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center py-8 px-16">
      <div className="flex flex-row items-center gap-x-4">
        <div>
          <h1 className="font-bold tracking-wider text-2xl text-green-500 cursor-pointer" onClick={() => navigate('/')}>picsup</h1>
        </div>
        {/* <label className="relative hidden">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <GoSearch className="w-4 h-4 text-gray-500 pointer-events-none fill-current" />
          </span>
          <input type="text" placeholder="Search by name" className="py-3 pr-3 pl-9 bg-clip-content rounded-xl border-2 bg-transparent dark:text-white" />
        </label> */}
      </div>
      <div className="flex items-center gap-8">
        <DarkThemeToggle />
        <Button variant="contained" onClick={() => setOpen2(true)}>Add a photo</Button>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {auth.user.username}
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
          <MenuItem onClick={handleClose} label="profile">Profile</MenuItem>
          <MenuItem onClick={handleClose} label="images">My images</MenuItem>
          <MenuItem onClick={handleClose} label="logout">Logout</MenuItem>
        </Menu>
      </div>
      <ImageUploadDialog open={open2} onClose={() => setOpen2(false)} />
    </nav>
  )
}