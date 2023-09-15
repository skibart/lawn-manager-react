import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarWithLogo } from './Navigation/Sidebar';
import { ComplexNavbar } from './Navigation/Navbar';
import { Login } from './LoginSingup/Login';
import { useApp } from '../util/RealmApp';
import { DrawerWithNavigation } from './Navigation/Drawer';

function RootLayout() {
  const { currentUser } = useApp();
  const [openDrawer, setOpenDrawer] = useState(false);

  if (currentUser) {
    return (
      <div className="flex white bg-gray-50">
        <SidebarWithLogo type="shadow" />
        <DrawerWithNavigation
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />

        <div className=" relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden inline-block">
          <ComplexNavbar setOpenDrawer={setOpenDrawer} />
          <div className="w-11/12 mx-auto mb-2">
            <Outlet />
          </div>
        </div>
      </div>
    );
  } else {
    return <Login />;
  }
}

export default RootLayout;
