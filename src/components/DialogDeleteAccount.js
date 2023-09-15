import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from '@material-tailwind/react';
import { useTranslation, Trans } from 'react-i18next';

import { XCircleIcon } from '@heroicons/react/24/solid';

export function DialogDeleteAccount(props) {
  const { i18n } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'profile' });

  const [inputCorrect, setInputCorrect] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);

  const labelInputDelete = t('part10');

  const handleOpen = () => setOpen(!open);

  const inputHandler = (e) => {
    setInputValue(e.target.value);
    const translatedString = t('part9');
    if (e.target.value === translatedString) {
      setInputCorrect(true);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        <Trans i18nKey="button.Delete-account">Delete account....</Trans>
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Trans i18nKey="profile.part6">Deactivate....</Trans>
        </DialogHeader>

        <DialogBody divider>
          <div className="flex">
            <XCircleIcon className="h-14 w-14 mr-4" />
            <div>
              <div className="mb-2">
                <Trans i18nKey="profile.part7">...</Trans>
              </div>
              <div className="mb-2">
                <Trans i18nKey="profile.part8">...</Trans>
              </div>

              <Input
                value={inputValue}
                onChange={(e) => {
                  inputHandler(e);
                }}
                label={labelInputDelete}
              />
            </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span> {<Trans i18nKey="button.cancel">cancel...</Trans>}</span>
          </Button>
          <Button
            disabled={!inputCorrect}
            variant="gradient"
            color="green"
            onClick={props.deleteUserAccount}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
