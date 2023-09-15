import React, { useState, useEffect, useContext } from 'react';
import { Card, Typography } from '@material-tailwind/react';

import { useCollection } from '../../hooks/useCollection';
import { ContexData } from '../../util/ContexData';

import ChartBarFertilizers from './Chart/ChartBarFertilizers';
import { useTranslation } from 'react-i18next';

function ChartBar() {
  const { i18n } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'dashboard' });

  const dbUsers = process.env.REACT_APP_DBUSERSDATA;
  const fertelizationUsers = process.env.REACT_APP_DB_COLLECTION_DATA;
  const [ratiosValue, setRationsValue] = useState([]);
  const [ratiosName, setRatiosName] = useState([]);
  const [fertelizersCount, setfertelizersCount] = useState(0);

  const reportsClient = useCollection({
    db: dbUsers,
    collection: fertelizationUsers,
  });

  const fertilizers = useContext(ContexData);
  const [reportCollection, setReportCollection] = useState([]);

  useEffect(() => {
    async function fetchReport() {
      const data = await reportsClient.find(
        {},
        { limit: 10, sort: { date: -1 } },
      );
      setReportCollection(data);
    }
    fetchReport();
  }, []);

  useEffect(() => {
    const usedFertelizer = reportCollection.map((item) => ({
      idFer: item.idFer,
      ActualWeight: item.ActualWeight,
    }));
    let fertelizers4chart = [];

    usedFertelizer.forEach((oneFertelizer) => {
      const currentFertelizer = {};
      const indexFertelizersData = fertilizers.findIndex(
        (item) => item.idFer === oneFertelizer.idFer,
      );
      if (indexFertelizersData > 0) {
        currentFertelizer.name = fertilizers[indexFertelizersData].name;
        currentFertelizer.ActualWeight = oneFertelizer.ActualWeight;
        fertelizers4chart.push(currentFertelizer);
      } else {
        return;
      }
    });
    let ratiosValueTemp = [];
    let ratiosNameTemp = [];

    for (const item in fertelizers4chart) {
      ratiosValueTemp.push(fertelizers4chart[item].ActualWeight);
      ratiosNameTemp.push(fertelizers4chart[item].name);
    }
    setfertelizersCount(fertelizers4chart.length);
    setRationsValue(ratiosValueTemp);
    setRatiosName(ratiosNameTemp);
  }, [reportCollection, fertilizers]);

  return (
    <Card className="mt-6 p-4">
      <Typography variant="h6" color="blue-gray" className="mb-2">
        {t('last-fertilizers-used')}
      </Typography>

      <ChartBarFertilizers ratiosValue={ratiosValue} ratiosName={ratiosName} />
    </Card>
  );
}

export default ChartBar;
