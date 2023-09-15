import { Link } from 'react-router-dom';
import { Button, Card, CardBody } from '@material-tailwind/react';

import { useTranslation, Trans } from 'react-i18next';

function AddBox() {
  const { i18n } = useTranslation();

  return (
    <Card className="bg-green-700 mt-6 p-4 pb-20 pt-20 shadow-md hover:bg-green-400 flex flex-col max-h-[800px] ">
      <CardBody>
        <div className="flex justify-center">
          <Link to="fertilize/addreport">
            <Button color="white" size="lg">
              <Trans i18nKey="dashboard.addBox">translation...</Trans>
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}

export default AddBox;
