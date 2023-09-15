import React from 'react';
import { useApp } from '../../util/RealmApp';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import NavbarFlag from './NavbarFlag';
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from '@material-tailwind/react';
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  Bars4Icon,
} from '@heroicons/react/24/outline';
import avatar from '../../assets/Avatar_icon_green.svg.png';

function ProfileMenu() {
  const { i18n } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'navbar' });

  let navigate = useNavigate();

  const { logOut } = useApp();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  async function logoutHandler() {
    await logOut();
  }
  function linkProfileHandler() {
    navigate('profile');
  }

  // profile menu component
  const profileMenuItems = [
    {
      label: t('my-profile'),
      icon: UserCircleIcon,
      link: linkProfileHandler,
    },
    {
      label: t('log-out'),
      icon: PowerIcon,
      link: logoutHandler,
    },
  ];

  return (
    <>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              className="border border-green-400 p-0.5"
              src={avatar}
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon, link }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={link}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                    : ''
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? 'red' : 'inherit'}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
}

export function ComplexNavbar({ setOpenDrawer }) {
  const drawerOpenHandler = () => {
    setOpenDrawer(true);
  };

  return (
    <Navbar
      fullWidth={true}
      className="mx-auto p-2 pr-8 lg:pl-6 flex flex-row mb-4"
    >
      <div className="basis-1/2 mx-auto flex justify-start">
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={drawerOpenHandler}
          className="mt-1 ml-2 md:hidden "
        >
          <Bars4Icon className="h-9 w-9" />
        </IconButton>
      </div>

      <div className="basis-1/2 mx-auto flex justify-end">
        <div className="flex items-center space-x-4">
          <NavbarFlag />
          <ProfileMenu />
        </div>
      </div>
    </Navbar>
  );
}
