import React, { useState } from 'react';
import { useApp } from '../../util/RealmApp';
import { useTranslation, Trans } from 'react-i18next';

import { Input, Button, Typography } from '@material-tailwind/react';

export function ForgotPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'login' });

  const app = useApp();

  const [email, setEmail] = useState('');
  const [error, setError] = useState({
    email: false,
    generalError: false,
  });
  const [isSending, setIsSending] = useState(false);
  const [restartOK, setRestartOK] = useState(false);

  async function registerHandler() {
    try {
      setIsSending(true);
      const response = await app.emailPasswordAuth.sendResetPasswordEmail({
        email: email,
      });
      setIsSending(false);
      setRestartOK(true);

      if (!response) {
      } else {
        setError((prev) => ({
          email: true,
          generalError: true,
        }));
      }
    } catch (err) {
      console.log(err);
      setError((prev) => ({
        ...prev,
        generalError: true,
      }));
      setIsSending(false);
    }
  }

  return (
    <>
      <Typography variant="h4" color="red">
        {error.generalError ? 'Error' : ''}
      </Typography>

      {!restartOK ? (
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error.email}
            />
          </div>
          <Button onClick={registerHandler} className="mt-6" fullWidth>
            {!isSending ? t('send-reset-email') : t('sending-btn')}
          </Button>
        </form>
      ) : (
        <>
          <Typography color="gray" className="mt-4 text-center font-normal">
            <p>{t('check-email')}</p>
          </Typography>
        </>
      )}
    </>
  );
}
