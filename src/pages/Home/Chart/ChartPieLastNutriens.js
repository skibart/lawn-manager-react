import ReactApexChart from 'react-apexcharts';

function ChartPieLastNutriens({ ratiosValue, ratiosName }) {

  const chartData = {
    series: ratiosValue,
    options: {
      chart: {
        type: 'pie',
      },
      labels: ratiosName,
    
    },
  }

  return ratiosValue.length > 0 ? (
    <ReactApexChart options={chartData.options} series={chartData.series} type="pie" />
  ) : (
    <div className="flex justify-center items-center h-full">
      <div className="w-14 h-14 rounded-full animate-spin border-y-4 border-solid border-green-500 border-t-transparent shadow-md"></div>
    </div>
  )
}

export default ChartPieLastNutriens;
