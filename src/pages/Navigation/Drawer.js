import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../util/RealmApp';
import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react';

import {
  UserCircleIcon,
  PuzzlePieceIcon,
  HomeModernIcon,
  PowerIcon,
  CircleStackIcon,
  PencilSquareIcon,
  FolderPlusIcon,
  BookOpenIcon,
} from '@heroicons/react/24/solid';

import { useTranslation, Trans } from 'react-i18next';

export function DrawerWithNavigation({ openDrawer, setOpenDrawer }) {
  const closeDrawerHandler = () => setOpenDrawer(false);
  const { logOut } = useApp();

  async function logoutHandler() {
    await logOut();
  }

  const { i18n } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'sidebar' });

  const menuItems = [
    {
      label: 'Dashboard',
      link: '/',
      icon: HomeModernIcon,
      onClick: closeDrawerHandler,
    },
    {
      label: t('reports'),
      link: 'fertilize/report',
      icon: BookOpenIcon,
      onClick: closeDrawerHandler,
    },
    {
      label: t('add-report'),
      link: 'fertilize/addreport',
      icon: PencilSquareIcon,
      onClick: closeDrawerHandler,
    },
    {
      label: t('fertilizers'),
      link: 'fertilize/fertilizers',
      icon: CircleStackIcon,
      onClick: closeDrawerHandler,
    },
    {
      label: t('add-fertilizer'),
      link: 'fertilize/addfertilizer',
      icon: FolderPlusIcon,
      onClick: closeDrawerHandler,
    },
    {
      label: t('profile'),
      link: 'profile',
      icon: UserCircleIcon,
      onClick: closeDrawerHandler,
    },
    {
      label: t('log-out'),
      link: '',
      icon: PowerIcon,
      onClick: logoutHandler,
    },
  ];

  return (
    <React.Fragment>
      <Drawer open={openDrawer} onClose={closeDrawerHandler}>
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            Menu
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        <List>
          {menuItems.map((itemLink, index) => (
            <Link to={itemLink.link} key={index}>
              <ListItem onClick={itemLink.onClick}>
                <ListItemPrefix>
                  {React.createElement(itemLink.icon, {
                    className: `h-5 w-5`,
                  })}
                </ListItemPrefix>
                {itemLink.label}
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
}
