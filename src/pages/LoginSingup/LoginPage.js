import React, { useState } from 'react';
import { useApp } from '../../util/RealmApp';
import * as Realm from 'realm-web';
import { useTranslation, Trans } from 'react-i18next';

import { Input, Button, Typography } from '@material-tailwind/react';

export function LoginPage(props) {
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

  async function loginHandler() {
    try {
      setIsSending(true);
      const reponse = await app.logIn(
        Realm.Credentials.emailPassword(email, password),
      );
      if (reponse) {
        setIsSending(false);
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

      <form className="mt-8 mb-2 w-80 max-w-screen-lg ">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="E-mail"
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
        </div>
        <Button onClick={loginHandler} className="mt-6" fullWidth>
          {!isSending ? 'Login' : t('sending-btn')}
        </Button>
      </form>
    </>
  );
}
