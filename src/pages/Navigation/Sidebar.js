import React from 'react';
import { useApp } from '../../util/RealmApp';
import { Link } from 'react-router-dom';

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import {
  UserCircleIcon,
  PuzzlePieceIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

import { useTranslation, Trans } from 'react-i18next';

import Logo from '../../components/Logo';

export function SidebarWithLogo() {
  const { i18n } = useTranslation();

  const { logOut } = useApp();

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card shadow={true} className="hidden md:block w-full max-w-[20rem] p-4 ">
      <div className="mb-2 flex items-center gap-4 p-4">
        <Logo />
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? 'rotate-180' : ''
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <PuzzlePieceIcon className="h-5 w-5" />
              </ListItemPrefix>

              <Typography color="blue-gray" className="mr-auto font-normal">
                <Trans i18nKey="sidebar.fertilize">Fertilize...</Trans>
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <Link to="fertilize/report">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  <Trans i18nKey="sidebar.reports">Reports...</Trans>
                </ListItem>
              </Link>
              <Link to="fertilize/addreport">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  <Trans i18nKey="sidebar.add-report">Add...</Trans>
                </ListItem>
              </Link>
              <Link to="fertilize/fertilizers">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  <Trans i18nKey="sidebar.fertilizers">Fertilizers...</Trans>
                </ListItem>
              </Link>
              <Link to="fertilize/addfertilizer">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>

                  <Trans i18nKey="sidebar.add-fertilizer">Add...</Trans>
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>

        <hr className="my-2 border-blue-gray-50" />
        <Link to="profile">
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Trans i18nKey="sidebar.profile">Profile...</Trans>
          </ListItem>
        </Link>
        <ListItem onClick={async () => await logOut()}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Trans i18nKey="sidebar.log-out">Log out...</Trans>
        </ListItem>
      </List>
    </Card>
  );
}
