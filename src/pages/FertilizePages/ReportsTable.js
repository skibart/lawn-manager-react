import { Typography } from '@material-tailwind/react';
import { DetailsOfFertelization } from './DetailsOfFertelization';
import { useTranslation } from 'react-i18next';

export function ReportsTable(props) {
  const { t } = useTranslation('translation', { keyPrefix: 'reports' });

  const TABLE_HEAD = [
    t('no'),
    t('fertilizer'),
    t('details'),
    t('size'),
    t('weight'),
    t('date'),
    '',
  ];

  function IconTrash() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6 hover:text-cyan-600"
      >
        <path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
      </svg>
    );
  }

  return (
    <div className="overflow-scroll">
      <table className="mt-4 w-full min-w-max table-auto text-left text-sm">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.report.map(
            (
              { _id, fertilizName, ActualWeight, idFer, meter, date },
              index,
            ) => {
              const isLast = index === props.report.length - 1;
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50';

              return (
                <tr key={_id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {fertilizName}
                    </Typography>
                  </td>
                  <td className={`${classes}`}>
                    <DetailsOfFertelization
                      weight={ActualWeight}
                      id={idFer}
                      fertilizers={props.fertilizersDetails}
                    />
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {meter}
                    </Typography>
                  </td>
                  <td className={`${classes}`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {ActualWeight}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {new Date(date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </Typography>
                  </td>
                  <td className={`${classes}`}>
                    <Typography
                      onClick={() => {
                        props.deleteHandler({ _id });
                      }}
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium "
                    >
                      <IconTrash className="" />
                    </Typography>
                  </td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </div>
  );
}
