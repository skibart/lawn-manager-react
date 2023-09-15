import React, { useState, useEffect, Fragment, useContext } from 'react';
import CardMy from '../../components/CardMy';
import { useCollection } from '../../hooks/useCollection';
import { ReportsTable } from './ReportsTable';
import { AlertCustomAnimation } from '../../components/AlertCustomAnimation';
import { ContexData } from '../../util/ContexData';
import { useTranslation } from 'react-i18next';

export const ReportsOfFertilization = (props) => {
  const fertilizers = useContext(ContexData);
  const { i18n } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'reports' });
  const [reportCollection, setReportCollection] = useState([]);
  const collection = useCollection({});

  useEffect(() => {
    async function fetchReport() {
      const data = await collection.find({});
      setReportCollection(data);
    }
    fetchReport();
  }, [props.reload]);

  const deleteReport = async (idOfDeletedItem) => {
    await collection.deleteOne({ _id: idOfDeletedItem._id });

    setReportCollection((oldDrafts) => {
      const idDeletedItem = oldDrafts.findIndex(
        (d) => d._id === idOfDeletedItem._id,
      );
      return [
        ...oldDrafts.slice(0, idDeletedItem),
        ...oldDrafts.slice(idDeletedItem + 1),
      ];
    });

    setNotificationAllert((prevState) => ({
      ...prevState,
      open: true,
    }));
  };

  const [notificationAllert, setNotificationAllert] = useState({
    open: false,
    type: '',
    icon: true,
    color: 'blue',
    message: t('raport-deleted'),
  });

  return (
    <React.Fragment>
      <AlertCustomAnimation
        setAllert={setNotificationAllert}
        settings={notificationAllert}
      />
      <CardMy title={t('title')}>
        <ReportsTable
          fertilizersDetails={fertilizers}
          deleteHandler={deleteReport}
          report={reportCollection}
        />
      </CardMy>
    </React.Fragment>
  );
};
