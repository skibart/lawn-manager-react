import React, { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, Typography } from '@material-tailwind/react';

import background from '../../assets/backgroundlawn.jpg';
import Logo from '../../components/Logo';

import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { RegisterOk } from './RegisterOk';
import { ForgotPage } from './ForgotPage';
import { ResetPassword } from './ResetPassword';

export function Login() {
  const { i18n } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'login' });

  const [token, setToken] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [whatPage, setWhatPage] = useState('login');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newToken = params.get('token');
    const newTokenId = params.get('tokenId');
    const successRegistration = params.get('success');

    if (newToken && newTokenId) {
      setToken(newToken);
      setTokenId(newTokenId);
      setWhatPage('resetPw');
    }
    if (successRegistration) {
      setWhatPage('success');
    }
  }, [token, tokenId]);

  const downLinkChanger = (data) => {
    setWhatPage(data);
  };

  const displayHeader = () => {
    if (whatPage === 'login') {
      return 'Login';
    }
    if (whatPage === 'register') {
      return t('register');
    }
    if (whatPage === 'registerOk') {
      return t('register-success');
    }
    if (whatPage === 'forgotPage') {
      return t('reset-pw');
    }
    if (whatPage === 'resetPw') {
      return t('set-pw');
    }
    if (whatPage === 'success') {
      return t('Account confirmed');
    } else {
      return t('login');
    }
  };

  const displayPage = () => {
    if (whatPage === 'login') {
      return <LoginPage />;
    }
    if (whatPage === 'success') {
      return <LoginPage />;
    }
    if (whatPage === 'register') {
      return <RegisterPage downLinkChanger={downLinkChanger} />;
    }
    if (whatPage === 'registerOk') {
      return <RegisterOk />;
    }
    if (whatPage === 'forgotPage') {
      return <ForgotPage />;
    }
    if (whatPage === 'resetPw') {
      return (
        <ResetPassword
          token={token}
          tokenId={tokenId}
          downLinkChanger={downLinkChanger}
        />
      );
    } else {
      return <LoginPage />;
    }
  };

  return (
    <>
      <div
        className="bg-cover bg-center h-screen flex items-center relative"
        style={{
          backgroundImage: `url(${background})`,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <div
          className="absolute inset-0 flex justify-center items-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <Card className="p-2 lg:p-8" color="white" shadow={false}>
            <Logo />
            <Typography className="mt-4" variant="h4" color="blue-gray">
              {displayHeader()}
            </Typography>

            {displayPage()}

            <Typography color="gray" className="mt-4 text-center font-normal">
              {(whatPage === 'login') | (whatPage === 'forgotPage') ? (
                <>
                  {t('dont-have-account')}
                  <Link
                    onClick={() => {
                      setWhatPage('register');
                    }}
                    className="font-medium text-gray-900"
                  >
                    {t('singup')}
                  </Link>
                </>
              ) : null}

              {whatPage === 'register' ? (
                <>
                  {t('already-have-account')}
                  <Link
                    onClick={() => {
                      setWhatPage('login');
                    }}
                    className="font-medium text-gray-900"
                  >
                    {t('singin')}
                  </Link>
                </>
              ) : null}
            </Typography>
            {(whatPage === 'login') |
            (whatPage === 'success') |
            (whatPage === 'register') ? (
              <Typography color="gray" className="mt-4 text-center font-normal">
                {t('forgot-password')}
                <Link
                  onClick={() => {
                    setWhatPage('forgotPage');
                  }}
                  className="font-medium text-gray-900"
                >
                  {t('remind')}
                </Link>
              </Typography>
            ) : null}
            {whatPage === 'resetPw' ? (
              <Typography color="gray" className="mt-4 text-center font-normal">
                {t('dont-have-account')}
                <Link
                  onClick={() => {
                    setWhatPage('register');
                  }}
                  className="font-medium text-gray-900"
                >
                  {t('singup')}
                </Link>
              </Typography>
            ) : null}
          </Card>
        </div>
      </div>
    </>
  );
}
