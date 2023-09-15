import * as Realm from 'realm-web';
import React, { useState, useEffect } from 'react';
import { useApp } from '../../components/RealmApp';
import { LoginSingup } from '../../components/LoginSingup';
import { useTranslation, Trans } from 'react-i18next';

export function Login() {
  const { t } = useTranslation('translation', { keyPrefix: 'login' });

  const app = useApp();

  const [successConfirm, setSuccessConfirm] = useState(false);
  const [singupComplete, setSingupComplete] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('success')) {
      setSuccessConfirm(true);
      console.log('udalo sie');
    }
  }, []);

  const [isLogging, setIsLogging] = useState(true);
  const [error, setError] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginSingupHandler() {
    try {
      if (isLogging) {
        await app.logIn(Realm.Credentials.emailPassword(email, password));
      } else {
        await app.emailPasswordAuth.registerUser({ email, password });
        setSingupComplete(true);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }

  return (
    <>
      <LoginSingup
        setEmailParent={setEmail}
        setPasswordParent={setPassword}
        setIsLogging={setIsLogging}
        loginSingupHandler={loginSingupHandler}
        error={error}
        isLogging={isLogging}
      />
    </>
  );
}
