import ReactApexChart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

function ChartBarFertilizers({ ratiosValue, ratiosName }) {
  const randomNumber = parseInt(Math.floor(Math.random() * 9), 10);
  const palletteRandom = 'palette' + randomNumber;

  const { i18n } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'dashboard' });

  const chartData = {
    series: [
      {
        name: t('grams'),
        data: ratiosValue,
      },
    ],

    options: {
      chart: {
        type: 'bar',
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: ratiosName,
        style: {
          fontSize: '6px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: undefined,
        },
      },
      xaxis: {
        enabled: false,
        categories: ratiosName,
        labels: {
          show: true,
          rotate: 0,
          style: {
            fontSize: '7px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label',
          },
        },
      },

      theme: {
        palette: palletteRandom,
      },
    },
  };

  return ratiosValue.length > 0 ? (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="bar"
    />
  ) : (
    <div className="flex justify-center items-center h-full">
      <div className="w-14 h-14 rounded-full animate-spin border-y-4 border-solid border-green-500 border-t-transparent shadow-md"></div>
    </div>
  );
}

export default ChartBarFertilizers;
