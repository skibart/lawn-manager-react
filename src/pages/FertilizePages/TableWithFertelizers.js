import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import { DetailsNutrients } from './DetailsNutrients';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function TableWithFertelizers(props) {
  const { i18n } = useTranslation();
  const { t } = useTranslation('translation');

  const [tableData, setTableData] = useState([]);
  const TABLE_HEAD = [
    t('fertilizers.name'),
    t('fertilizers.type'),
    t('fertilizers.nitrogen'),
    t('fertilizers.phosphorus'),
    t('fertilizers.potassium'),
    t('fertilizers.other-nutrients'),
  ];

  useEffect(() => {
    if (props.fertilizers.length < 1) {
      return;
    }
    const dataRaw = props.fertilizers;
    const tableRow = dataRaw.map((item) => ({
      name: item.name,
      type: 'complex',
      nitrogen: item.nutrient_content['nitrogen']
        ? item.nutrient_content['nitrogen'] + '%'
        : '0%',
      phosphorus: item.nutrient_content['phosphorus']
        ? item.nutrient_content['phosphorus'] + '%'
        : '0%',
      potassium: item.nutrient_content['potassium']
        ? item.nutrient_content['potassium'] + '%'
        : '0%',
      nutrients: {
        [t('nutrients.magnesium')]: item.nutrient_content['magnesium']
          ? item.nutrient_content['magnesium'] + '%'
          : '0%',
        [t('nutrients.sulfur')]: item.nutrient_content['sulfur']
          ? item.nutrient_content['sulfur'] + '%'
          : '0%',
        [t('nutrients.boron')]: item.nutrient_content['boron']
          ? item.nutrient_content['boron'] + '%'
          : '0%',
        [t('nutrients.iron')]: item.nutrient_content['iron']
          ? item.nutrient_content['iron'] + '%'
          : '0%',
        [t('nutrients.manganese')]: item.nutrient_content['manganese']
          ? item.nutrient_content['manganese'] + '%'
          : '0%',
        [t('nutrients.zinc')]: item.nutrient_content['zinc']
          ? item.nutrient_content['zinc'] + '%'
          : '0%',
        [t('nutrients.calcium')]: item.nutrient_content['calcium']
          ? item.nutrient_content['calcium'] + '%'
          : '0%',
      },
    }));
    setTableData(tableRow);
  }, [props.fertilizers]);

  return (
    <div className="overflow-scroll">
      <table className="mt-4 w-full min-w-max table-auto text-left text-sm">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th
                key={head}
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                >
                  {head}{' '}
                  {index !== TABLE_HEAD.length - 1 && (
                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                  )}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map(
            (
              { name, type, nitrogen, phosphorus, potassium, nutrients },
              index,
            ) => (
              <tr key={name} className="even:bg-blue-gray-50/50">
                <td className="p-2 pl-5 border-b border-blue-gray-50">
                  {name}
                </td>
                <td className="p-2 border-b border-blue-gray-50 text-center">
                  {type}
                </td>
                <td className="p-2 border-b border-blue-gray-50 text-center">
                  {nitrogen}
                </td>
                <td className="p-2 border-b border-blue-gray-50 text-center">
                  {phosphorus}
                </td>
                <td className="p-2 border-b border-blue-gray-50 text-center">
                  {potassium}
                </td>
                <td className="p-2 border-b border-blue-gray-50 text-xs">
                  <DetailsNutrients nutrients={nutrients} />
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
