import React, { useState } from 'react';
import { useApp } from '../../util/RealmApp';

import { Input, Checkbox, Button, Typography } from '@material-tailwind/react';
import { useTranslation, Trans } from 'react-i18next';
import { DialogTermsCondition } from './DialogTermsCondition';
export function RegisterPage(props) {
  const { t } = useTranslation('translation', { keyPrefix: 'login' });

  const app = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    email: false,
    password: false,
    generalError: false,
  });
  const [isSending, setIsSending] = useState(false);

  const [agreeAccepted, setAgreeAccepted] = useState(false);

  async function registerHandler() {
    try {
      setIsSending(true);
      await app.emailPasswordAuth.registerUser({ email, password });
      setIsSending(false);
      props.downLinkChanger('registerOk');
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

      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error.email}
          />

          <Input
            type="password"
            size="lg"
            label={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error.password}
          />
          <Checkbox
            onClick={(e) => {
              setAgreeAccepted(e.target.checked);
            }}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                {t('agree')}
                <DialogTermsCondition />
              </Typography>
            }
            containerProps={{ className: '-ml-2.5' }}
          />
        </div>
        <Button
          disabled={!agreeAccepted}
          onClick={registerHandler}
          className="mt-6"
          fullWidth
        >
          {!isSending ? t('register') : t('sending-btn')}
        </Button>
      </form>
    </>
  );
}
