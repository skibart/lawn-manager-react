import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

const mainNutrients = [
  'nitrogen',
  'potassium',
  'phosphorus',
  'magnesium',
  'sulfur',
];

function ChartLineMonths({ reportCollection, usedFertilizers }) {
  const { i18n } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'dashboard' });

  const [nitrogenReady, setNitrogenReady] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [pottasiumReady, setPottasiumReady] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [phosphorusReady, setPhosphorusReady] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [sulfurReady, setSulfurReady] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  useEffect(() => {
    const allFertalizationComplete = [];
    reportCollection.forEach((nawozenie) => {
      const oneFertalizationComplete = {};
      const currentUsedFertilizerIndex = usedFertilizers.findIndex(
        (item) => item.idFer === nawozenie.idFer,
      );
      oneFertalizationComplete.name =
        usedFertilizers[currentUsedFertilizerIndex].name;
      oneFertalizationComplete.id = nawozenie.idFer;
      oneFertalizationComplete.weight = nawozenie.ActualWeight;
      oneFertalizationComplete.date = nawozenie.date;
      for (const nutrient in mainNutrients) {
        const nutrientKey = mainNutrients[nutrient];
        oneFertalizationComplete[nutrientKey] = Math.floor(
          nawozenie.ActualWeight *
            (usedFertilizers[currentUsedFertilizerIndex].nutrient_content[
              nutrientKey
            ] /
              100),
        );
      }
      allFertalizationComplete.push(oneFertalizationComplete);
    });

    const nutrientArrays = {};

    mainNutrients.forEach((nutrient) => {
      nutrientArrays[nutrient] = Array(12).fill(0);
    });

    allFertalizationComplete.forEach((item) => {
      const indexPostion = item.date - 1;
      mainNutrients.forEach((nutrient) => {
        nutrientArrays[nutrient][indexPostion] += item[nutrient];
      });
    });
    setNitrogenReady(nutrientArrays.nitrogen);
    setPottasiumReady(nutrientArrays.potassium);
    setPhosphorusReady(nutrientArrays.phosphorus);
    setSulfurReady(nutrientArrays.sulfur);
  }, []);

  const chartData = {
    series: [
      {
        name: t('nitrogen'),
        data: nitrogenReady,
      },
      {
        name: t('potassium'),
        data: pottasiumReady,
      },
      {
        name: t('phosphorus'),
        data: phosphorusReady,
      },
      {
        name: t('magnesium'),
        data: sulfurReady,
      },
    ],

    options: {
      chart: {
        type: 'bar',
      },

      plotOptions: {
        bar: {
          distributed: true,
        },
      },
      xaxis: {
        categories: [
          '01',
          '02',
          '03',
          '04',
          '05',
          '06',
          '07',
          '08',
          '09',
          '10',
          '11',
          '12',
        ],
      },
      dataLabels: {
        enabled: false,
      },

      theme: {
        palette: 'palette2',
      },
    },
  };

  return reportCollection.length > 0 ? (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="line"
    />
  ) : (
    <div className="flex justify-center items-center h-full">
      <div className="w-14 h-14 rounded-full animate-spin border-y-4 border-solid border-green-500 border-t-transparent shadow-md"></div>
    </div>
  );
}

export default ChartLineMonths;
