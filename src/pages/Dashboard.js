import React, { useContext, useState, useEffect } from 'react';
import { useCollection } from '../hooks/useCollection';
import { useTranslation } from 'react-i18next';
import { useApp } from '../util/RealmApp';

import AddBox from './Home/AddBox';
import ChartPie from './Home/ChartPie';
import ChartBar from './Home/ChartBar';
import ChartMonths from './Home/ChartMonths';
import { ContexData } from '../util/ContexData';
import { AlertCustomAnimation } from '../components/AlertCustomAnimation';

function Dashboard() {
  const { currentUser } = useApp();
  const { t } = useTranslation('translation', { keyPrefix: 'dashboard' });
  const dbUsers = process.env.REACT_APP_DBUSERSDATA;
  const fertelizationUsers = process.env.REACT_APP_DB_COLLECTION_DATA;
  const fertilizers = useContext(ContexData);
  const collectionClient = useCollection({
    db: dbUsers,
    collection: fertelizationUsers,
  });
  const [notificationAllert, setNotificationAllert] = useState({
    open: false,
    type: '',
    icon: true,
    color: 'green',
    message: t('welcome-alert'),
  });

  const collectionUserData = useCollection({
    db: 'users',
    collection: 'user-info',
  });

  useEffect(() => {
    if (currentUser) {
      async function fetchData() {
        setNotificationAllert((prevData) => ({
          ...prevData,
          open: currentUser.customData.firstLogin,
        }));
      }
      fetchData();
      async function changeFirstLogin() {
        await collectionUserData.updateOne(
          { userId: currentUser.id },
          { $set: { firstLogin: false } },
        );
      }
      changeFirstLogin();
    }
  }, [currentUser]);

  return (
    <main className="flex-1 lg:p-4 md:p-3 sm:p-0">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-6 lg:gap-4 sm:gap-0">
        <AlertCustomAnimation
          setAllert={setNotificationAllert}
          settings={notificationAllert}
        />
        <div className="col-span-2">
          <AddBox />
        </div>
        <div className="col-span-4">
          <ChartMonths
            collectionClient={collectionClient}
            fertilizers={fertilizers}
          />
        </div>
        <div className="col-span-3">
          <ChartPie />
        </div>
        <div className="col-span-3">
          <ChartBar />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
