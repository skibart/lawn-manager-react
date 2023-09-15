import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';

import {
  Button,
  MenuHandler,
  Menu,
  MenuList,
  MenuItem,
  Typography,
} from '@material-tailwind/react';

import { PL } from 'country-flag-icons/react/3x2';
import { GB } from 'country-flag-icons/react/3x2';

const availableLanguage = [
  {
    label: 'English',
    icon: GB,
    name: 'en',
  },
  {
    label: 'Polish',
    icon: PL,
    name: 'pl',
  },
];

export default function NavbarFlag() {
  const { i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button className="bg-white px-0 py-0 shadow-none">
          {availableLanguage.map((itemLink, index) =>
            React.createElement(itemLink.icon, {
              style: {
                display:
                  i18n.resolvedLanguage === itemLink.name ? 'block' : 'none',
              },
              key: index,
              className:
                'w-10 px-1 bg-white hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-indigo-500',
            }),
          )}
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {availableLanguage.map(({ label, icon, name }, key) => {
          const isLastItem = key === availableLanguage.length - 1;
          return (
            <MenuItem
              disabled={i18n.resolvedLanguage === name ? true : false}
              key={label}
              onClick={() => i18n.changeLanguage(name)}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                  : ''
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4`,
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
  );
}
