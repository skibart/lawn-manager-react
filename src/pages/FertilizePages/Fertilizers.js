import React, { useContext } from 'react';
import { TableWithFertelizers } from './TableWithFertelizers';
import CardMy from '../../components/CardMy';
import { ContexData } from '../../util/ContexData';
import { useTranslation } from 'react-i18next';

export const Fertilizers = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'fertilizers' });
  const fertilizers = useContext(ContexData);

  return (
    <CardMy title={t('title')}>
      <TableWithFertelizers fertilizers={fertilizers} />
    </CardMy>
  );
};
