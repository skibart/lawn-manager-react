import React from 'react';
import { Typography } from '@material-tailwind/react';
import { useTranslation, Trans } from 'react-i18next';

export function RegisterOk() {
  const { t } = useTranslation('translation', { keyPrefix: 'login' });

  return (
    <>
      <Typography
        color="gray"
        className="mt-4 text-center font-normal text-left max-w-md mx-auto"
      >
        {t('check-email-for-confirmation')}
      </Typography>
    </>
  );
}
