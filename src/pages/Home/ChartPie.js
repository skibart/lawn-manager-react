import React, { useState, useEffect, useContext } from 'react';
import { Card, Typography } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';

import { useCollection } from '../../hooks/useCollection';
import { ContexData } from '../../util/ContexData';

import ChartPieLastNutriens from './Chart/ChartPieLastNutriens';

function ChartPie() {
  const { i18n } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'dashboard' });

  const dbUsers = process.env.REACT_APP_DBUSERSDATA;
  const fertelizationUsers = process.env.REACT_APP_DB_COLLECTION_DATA;

  const [ratiosValue, setRationsValue] = useState([]);
  const [ratiosName, setRatiosName] = useState([]);

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
        { limit: 5, sort: { date: -1 } },
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

    let fertilizersArrayForChart = [];
    fertilizers.forEach((oneFertilizer) => {
      const fertilizerObj = {};
      for (const nawoz in oneFertilizer.nutrient_content) {
        fertilizerObj[nawoz] = oneFertilizer.nutrient_content[nawoz];
      }
      const fertilizerWithId = { ...fertilizerObj, idFer: oneFertilizer.idFer };
      fertilizersArrayForChart.push(fertilizerWithId);
    });

    let ratios = {};
    for (const nutirens in fertilizersArrayForChart[0]) {
      ratios[nutirens] = 0;
    }

    if (fertilizersArrayForChart.length !== 0) {
      usedFertelizer.forEach((CurrentUsedFertelizer) => {
        const indexOfCurrentlyUsingFertelizer =
          fertilizersArrayForChart.findIndex(
            (item) => item.idFer === CurrentUsedFertelizer.idFer,
          );

        const currentFertelizer =
          fertilizersArrayForChart[indexOfCurrentlyUsingFertelizer];

        for (const nutrient in currentFertelizer) {
          if (nutrient !== 'idFer' && currentFertelizer[nutrient] !== 0) {
            ratios[nutrient] =
              ratios[nutrient] +
              Math.floor(
                CurrentUsedFertelizer.ActualWeight *
                  (currentFertelizer[nutrient] / 100),
              );
          }
        }
      });
    }

    let ratiosValueTemp = [];
    let ratiosNameTemp = [];

    for (const nutrient in ratios) {
      if (ratios[nutrient] !== 0) {
        ratiosValueTemp.push(ratios[nutrient]);
        ratiosNameTemp.push(t(nutrient));
      }
    }
    setRationsValue(ratiosValueTemp);
    setRatiosName(ratiosNameTemp);
  }, [reportCollection, fertilizers]);

  return (
    <Card className="mt-6 p-4">
      <Typography variant="h6" color="blue-gray" className="mb-2">
        {t('title-begin')}
        {reportCollection.length}{' '}
        {reportCollection.length > 1
          ? t('title-fertilizations')
          : t('title-fertilization')}
      </Typography>

      <ChartPieLastNutriens ratiosValue={ratiosValue} ratiosName={ratiosName} />
    </Card>
  );
}

export default ChartPie;
