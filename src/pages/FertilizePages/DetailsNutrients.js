import React, { useState } from 'react';
import { Collapse } from '@material-tailwind/react';

import {
  PresentationChartBarIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

export function DetailsNutrients(props) {
  const { i18n } = useTranslation();
  const { t } = useTranslation('translation');

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <span onClick={toggleOpen} className="inline-flex items-baseline">
        <span>{t('fertilizers.more')}</span>
        <ChevronDownIcon
          className={`mb-2 h-3 w-3 transform transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </span>
      <Collapse open={open}>
        {Object.entries(props.nutrients).map(
          ([nutrientName, nutrientValue]) => (
            <div key={nutrientName}>
              {nutrientName}: {nutrientValue}
            </div>
          ),
        )}
      </Collapse>
    </>
  );
}
