import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';

import Dashboard from './pages/Dashboard';
import RootLayout from './pages/Root';
import { AddReport } from './pages/FertilizePages/AddReport';
import { ReportsOfFertilization } from './pages/FertilizePages/ReportsOfFertilization';
import { ConfirmationPage } from './pages/LoginSingup/confirmation';
import { Fertilizers } from './pages/FertilizePages/Fertilizers';
import { AddNewFertilizer } from './pages/FertilizePages/AddNewFertilizer';
import { Profile } from './pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    element: <RootLayout />,
    errorElement: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'profile', element: <Profile /> },
      { path: 'fertilize/fertilizers', element: <Fertilizers /> },
      { path: 'fertilize/addreport', element: <AddReport /> },
      { path: 'fertilize/report', element: <ReportsOfFertilization /> },
      { path: 'fertilize/addfertilizer', element: <AddNewFertilizer /> },
    ],
  },
  {
    path: 'login',
    element: <RootLayout />,
  },
  {
    path: 'confirmationpage',
    element: <ConfirmationPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
