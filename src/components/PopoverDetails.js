import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from '@material-tailwind/react';

export function PopoverDetails({ names, values }) {
  const { t } = useTranslation('translation', { keyPrefix: 'reports' });

  const chartData = {
    series: [
      {
        name: 'grams',
        data: values,
      },
    ],

    options: {
      chart: {
        fontFamily: 'Arial, sans-serif',
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      xaxis: {
        categories: names,
      },
    },
  };

  const [openPopover, setOpenPopover] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <Popover>
      <PopoverHandler>
        <Button className="focus:outline-none" variant="text">
          {t('details')}
        </Button>
      </PopoverHandler>
      <PopoverContent {...triggers} className="z-[999] lg:w-1/3 sm:w-4/5 ">
        {values.length > 0 ? (
          <>
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="bar"
            />
          </>
        ) : (
          <div className="flex justify-center items-center">
            <div className="w-14 h-14 rounded-full animate-spin border-y-4 border-solid border-green-500 border-t-transparent shadow-md"></div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
