import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { useNavigate } from '@tanstack/react-router';
import { ChevronDownIcon } from 'lucide-react';
import { Key, useState } from 'react';
import DarkThemeToggle from './DarkThemeToggle.tsx';
import ImageUploadDialog from './ImageUploadDialog.tsx';
import useUser from '../hooks/useUser.ts';

export default function Header() {
  const navigate = useNavigate();
  const userData = useUser();

  const [open, setOpen] = useState(false);

  const handleClose = (key: Key) => {
    switch (key) {
      case 'profile':
        navigate({ to: '/profile' });
        break;

      case 'images':
        navigate({ to: '/me/images' });
        break;

      case 'logout':
        logout();
        break;
    }
  };

  function logout() {
    document.cookie = "";
    window.localStorage.clear();
    window.location.reload();
  }

  return (
    <>
      <Navbar maxWidth='full' isBordered>
        <NavbarBrand>
          <div>
            <h1 className="font-bold tracking-wider text-2xl text-green-500 cursor-pointer" onClick={() => navigate({ to: '/' })}>picsup</h1>
          </div>
          {/* <label className="relative hidden">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <GoSearch className="w-4 h-4 text-gray-500 pointer-events-none fill-current" />
          </span>
          <input type="text" placeholder="Search by name" className="py-3 pr-3 pl-9 bg-clip-content rounded-xl border-2 bg-transparent dark:text-white" />
        </label> */}
        </NavbarBrand>
        <NavbarContent justify='end'>
          <NavbarItem>
            <DarkThemeToggle />
          </NavbarItem>
          <NavbarItem>
            <Button onClick={() => setOpen(true)}>
              Add a photo
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  endContent={<ChevronDownIcon />}
                >
                  {userData?.username ?? 'Stranger'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions" onAction={handleClose}>
                <DropdownItem key="profile">Profile</DropdownItem>
                <DropdownItem key="images">My images</DropdownItem>
                <DropdownItem key="logout" color="danger" className="text-danger">Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <ImageUploadDialog open={open} setOpen={setOpen} />
    </>
  )
}