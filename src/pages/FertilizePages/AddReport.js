import React, { useState, useEffect } from 'react';

import { createObjectId } from '../../util/utils';

import { CalculateFertilize } from './CalulateFerlitize';
import CardMy from '../../components/CardMy';

import { useApp } from '../../util/RealmApp';
import { useCollection } from '../../hooks/useCollection';
import { AlertCustomAnimation } from '../../components/AlertCustomAnimation';
import { ReportsOfFertilization } from './ReportsOfFertilization';
import { useTranslation } from 'react-i18next';

export const AddReport = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'addreport' });
  const [reloadReport, setReloadReport] = useState(0);
  const [storeParent, setStoreParent] = useState({});
  const { currentUser } = useApp();
  const CollectionReport = useCollection({});

  function updateParentStore(data) {
    setStoreParent(data);
  }

  async function addToDatabase(dataToAdd) {
    try {
      const addedResponse = await CollectionReport.insertOne(dataToAdd);

      if (addedResponse) {
        setNotificationAllert((prevData) => ({
          ...prevData,
          open: true,
        }));
        setReloadReport((prev) => prev + 1);
      } else {
        setNotificationAllert((prevData) => ({
          ...prevData,
          open: true,
          icon: false,
          color: 'red',
          message: t('reportWrong'),
        }));
      }
    } catch (err) {
      setNotificationAllert((prevData) => ({
        ...prevData,
        open: true,
        icon: false,
        color: 'red',
        message: err.message,
      }));
    }
  }

  async function addReportToDatabase() {
    let addedReport = {
      _id: createObjectId(),
      owner: currentUser.id,
      date: new Date(storeParent.date),
      ActualWeight: +storeParent.addedQuantity,
      fertilizName: storeParent.fertilizName,
      meter: +storeParent.meters,
      idFer: storeParent.idFer,
    };

    addToDatabase(addedReport);
  }

  const [notificationAllert, setNotificationAllert] = useState({
    open: false,
    type: '',
    icon: true,
    color: 'blue',
    message: t('reportOK'),
  });

  return (
    <>
      <AlertCustomAnimation
        setAllert={setNotificationAllert}
        settings={notificationAllert}
      />
      <CardMy title={t('title')}>
        <CalculateFertilize
          addReport={addReportToDatabase}
          updateParentStore={updateParentStore}
        />
      </CardMy>
      <ReportsOfFertilization reload={reloadReport} />
    </>
  );
};
