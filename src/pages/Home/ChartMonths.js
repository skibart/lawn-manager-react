import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';

import ChartLineMonths from './Chart/ChartLineMonths';
import { useTranslation } from 'react-i18next';

function ChartMonths(props) {
  const { i18n } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'dashboard' });

  const [reportCollection, setReportCollection] = useState([]);
  const [usedFertilizers, setUsedFertilizers] = useState([]);
  const [monthsAndNutritions, setMonthsAndNutritions] = useState([]);

  const monthsArr = [
    t('January'),
    t('February'),
    t('March'),
    t('April'),
    t('May'),
    t('June'),
    t('July'),
    t('August'),
    t('September'),
    t('October'),
    t('November'),
    t('December'),
  ];

  const mainNutrients = [
    t('nitrogen'),
    t('potassium'),
    t('phosphorus'),
    t('magnesium'),
    t('sulfur'),
  ];

  useEffect(() => {
    const array4charts = [];
    let currentIndex = 1;
    monthsArr.forEach((month) => {
      const monthWithData = {};
      for (const nutrient of mainNutrients) {
        monthWithData[nutrient] = 0;
      }
      monthWithData['monthName'] = month;
      monthWithData['monthID'] = currentIndex;
      array4charts.push(monthWithData);
      currentIndex++;
    });
  }, []);

  useEffect(() => {
    async function fetchReport() {
      const data = await props.collectionClient.find({
        date: { $gt: new Date('2023-01-01') },
      });
      console.log(data);
      const usedFer = await data.map((item) => ({
        idFer: item.idFer,
        ActualWeight: item.ActualWeight,
        date: parseInt(
          new Date(item.date).toLocaleDateString('en-GB', { month: '2-digit' }),
        ),
      }));

      setReportCollection(usedFer);
    }
    fetchReport();

    setUsedFertilizers(props.fertilizers);
  }, [props.collectionClient, props.fertilizers]);

  return reportCollection.length > 0 && usedFertilizers.length > 0 ? (
    <Card className="mt-6 p-4">
      <Typography variant="h6" color="blue-gray" className="mb-2">
        {t('text1')}
      </Typography>

      <ChartLineMonths
        reportCollection={reportCollection}
        usedFertilizers={usedFertilizers}
        monthsAndNutritions={monthsAndNutritions}
      />
    </Card>
  ) : (
    <Card className="mt-6 p-4">
      <CardBody>
        <div className="flex justify-center items-center h-full">
          <div className="w-14 h-14 rounded-full animate-spin border-y-4 border-solid border-green-500 border-t-transparent shadow-md"></div>
        </div>
      </CardBody>
    </Card>
  );
}

export default ChartMonths;
