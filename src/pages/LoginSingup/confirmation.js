import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../util/RealmApp';

export function ConfirmationPage() {
  const [massage, setMassage] = useState('checking...');
  const app = useApp();
  let navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const tokenId = params.get('tokenId');

  useEffect(() => {
    async function confirmUser() {
      try {
        const response = await app.emailPasswordAuth.confirmUser({
          token,
          tokenId,
        });
        setMassage('redirection.. ');
        navigate('/?success=success');
      } catch (err) {
        console.log(err);
      }
    }
    if (token && tokenId) {
      confirmUser();
    } else {
      setMassage('why are you here?!');
    }
  }, []);

  return <div>{massage}</div>;
}
