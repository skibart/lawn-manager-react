import { Typography, Input, Button } from '@material-tailwind/react';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useApp } from '../util/RealmApp';
import { useCollection } from '../hooks/useCollection';
import { DialogDeleteAccount } from '../components/DialogDeleteAccount';

import { useTranslation, Trans } from 'react-i18next';

import CardMy from '../components/CardMy';

export function Profile() {
  const { t } = useTranslation('translation', { keyPrefix: 'profile' });
  const { currentUser } = useApp();
  const { removeDeleteUser } = useApp();
  const [emailAdress, setEmailAdress] = useState('');
  const [lawnSize, setLawnSize] = useState(0);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [initiallyLawnSize, setInitialLawnSize] = useState(0);

  const collection = useCollection({
    db: 'users',
    collection: 'user-info',
  });

  function lawnSizeHandler(e) {
    setLawnSize(e.target.value);
    setShowSaveButton(true);
    if (initiallyLawnSize === e.target.value) {
      setShowSaveButton(false);
      currentUser.refreshCustomData();
    }
  }
  async function saveLawnSizeHandler() {
    await collection.updateOne(
      { userId: currentUser.id },
      { $set: { lawn_size: lawnSize } },
    );
    setShowSaveButton(false);
    await currentUser.refreshCustomData();
  }

  async function deleteUserAccount() {
    removeDeleteUser();
  }

  useEffect(() => {
    if (currentUser) {
      async function fetchData() {
        await currentUser.refreshCustomData();
        setLawnSize(parseInt(currentUser.customData.lawn_size));
        setInitialLawnSize(parseInt(currentUser.customData.lawn_size));
        setEmailAdress(currentUser._profile.data.email);
      }
      fetchData();
    }
  }, [currentUser]);

  return (
    <CardMy title="Profile">
      <div className="flex justify-center">
        <form className="mt-6 flex flex-col gap-4">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              <Trans i18nKey="profile.part1">size...</Trans>
            </Typography>
            <Input
              type="number"
              value={lawnSize}
              label={t('part1-label')}
              onChange={lawnSizeHandler}
            />
          </div>
          {showSaveButton && (
            <div className="flex justify-center">
              <Button onClick={saveLawnSizeHandler}>
                {<Trans i18nKey="button.save">save...</Trans>}
              </Button>
            </div>
          )}
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              <Trans i18nKey="profile.part2">Your e-mail...</Trans>
            </Typography>
            <Input type="email" value={emailAdress} label="4" disabled />
          </div>

          <div className="my-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              <Trans i18nKey="profile.part4">Language preference</Trans>
            </Typography>
            <div>{t('part13')}</div>
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-0 font-medium"
            >
              {' '}
              <Trans i18nKey="profile.part3">Want....</Trans>
            </Typography>
          </div>
          <DialogDeleteAccount deleteUserAccount={deleteUserAccount} />
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
          >
            <LockClosedIcon className="-mt-0.5 h-4 w-4" />
            <Trans i18nKey="profile.part12">User da...</Trans>
          </Typography>
        </form>
      </div>
    </CardMy>
  );
}
