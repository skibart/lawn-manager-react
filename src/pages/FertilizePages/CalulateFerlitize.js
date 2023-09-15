import React, { useState, useEffect, useContext } from 'react';
import DatepickerDefault from '../../components/DatepickerDefault';
import getCurrentDate from '../../util/utils';
import { useApp } from '../../util/RealmApp';

import { Button, Input } from '@material-tailwind/react';
import { SpinnerSize } from '../../components/Spinner';
import { ContexData } from '../../util/ContexData';
import { ToolTipIconI } from '../../components/ToolTipIconI';
import { useTranslation } from 'react-i18next';

const initialStore = {
  _id: '',
  owner: '',
  meters: 100,
  gramsForMeter: 0,
  fertilizName: null,
  suggestQuantityGrams: 0,
  suggestQuantityKg: 0,
  addedQuantity: '',
  date: getCurrentDate(),
};

export function CalculateFertilize(props) {
  const { i18n } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'addreport' });
  const { currentUser } = useApp();

  const [activeButton, setActivButton] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const fertilizers = useContext(ContexData);
  const [fertilizerStore, setFertilizersStore] = useState([]);

  const [store, setStore] = useState(initialStore);
  const [selectedOption, setSelectedOption] = useState('');

  const [isError, setIsError] = useState({
    meters: false,
    addedQuantity: false,
    select: false,
  });

  useEffect(() => {
    const lawnSizeData = parseInt(currentUser.customData.lawn_size);
    setStore((prev) => ({
      ...prev,
      meters: lawnSizeData,
    }));
  }, [isAdding]);

  useEffect(() => {
    setFertilizersStore([...fertilizers, []]);
  }, [fertilizers]);

  useEffect(() => {
    const results = store.gramsForMeter * store.meters;
    if (results === 0) {
      setStore((prev) => ({
        ...prev,
        suggestQuantityGrams: '',
        suggestQuantityKg: '',
        addedQuantity: '',
      }));
    } else {
      setStore((prev) => ({
        ...prev,
        suggestQuantityGrams: results,
        suggestQuantityKg: results / 1000,
        addedQuantity: results,
      }));
    }
  }, [store.meters, store.gramsForMeter, store.fertilizName]);

  useEffect(() => {
    props.updateParentStore(store);
  }, [store, props]);

  const selectChangeHandler = (event) => {
    setSelectedOption(event.target.value);
    const indexFertilizer = fertilizerStore.findIndex(
      (obj) => obj.name === event.target.value,
    );
    if (indexFertilizer < 0) {
      setStore((prevStore) => ({
        ...prevStore,
        fertilizName: null,
      }));
      return;
    }
    setIsError((prev) => ({
      ...prev,
      select: false,
    }));
    const currentFertelizer = fertilizerStore[indexFertilizer];

    setStore((prevStore) => ({
      ...prevStore,
      gramsForMeter: +currentFertelizer.gramsPerMeter,
      fertilizName: currentFertelizer.name,
      idFer: currentFertelizer.idFer,
    }));
  };

  const changeHandler = (event, field) => {
    if (event.target.value === '') {
      setStore((prevStore) => ({
        ...prevStore,
        [field]: event.target.value,
      }));
    }

    setStore((prevStore) => ({
      ...prevStore,
      [field]: +event.target.value,
    }));
    setIsError((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const onDateChangeHandler = (value) => {
    setStore((prevStore) => ({
      ...prevStore,
      date: value,
    }));
  };

  const onClickHandler = async () => {
    if (store.meters <= 0) {
      setIsError((prev) => ({
        ...prev,
        meters: true,
      }));
      return;
    }
    if (store.addedQuantity <= 0) {
      setIsError((prev) => ({
        ...prev,
        addedQuantity: true,
      }));
      return;
    }

    if (!store.fertilizName) {
      setIsError((prev) => ({
        ...prev,
        select: true,
      }));
      return;
    }

    setIsAdding(true);
    setActivButton(false);
    setSelectedOption('');
    setStore(initialStore);

    setTimeout(() => {
      props.addReport();
      setActivButton(true);
      setIsAdding(false);
    }, 1000);
  };

  return (
    <>
      {isAdding && <SpinnerSize />}
      <div className="sm:pr-2 sm:pl-2">
        <div className="md:flex md:items-center mb-2">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              {t('surface')}
              <ToolTipIconI text={t('toottip-1')} />
            </label>
          </div>
          <div className="sm:w-full md:w-1/3">
            <Input
              error={isError.meters}
              className="w-72"
              type="number"
              label={t('meter')}
              value={store.meters}
              onChange={(e) => {
                changeHandler(e, 'meters');
              }}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-2">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              {t('fertilizer')}
            </label>
          </div>
          <div className="sm:w-full md:w-1/3">
            <select
              value={selectedOption}
              onChange={selectChangeHandler}
              className={`peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent 
              px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border 
              placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-black 
              focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 w-full relative w-full min-w-[200px] h-11" ${
                isError.select ? 'border-red-500' : ''
              }`}
            >
              {fertilizerStore.map((item, index) => (
                <option value={item.name} key={`${item.idFer}-${index}`}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="md:flex md:items-center mb-2">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              {t('suggested-quantity')}
            </label>
          </div>
          <div className="sm:w-full md:w-1/3">
            <Input
              className="w-72"
              value={store.suggestQuantityGrams}
              disabled
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-2">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              {t('suggested-quantity-kg')}
            </label>
          </div>
          <div className="sm:w-full md:w-1/3">
            <Input className="w-72" value={store.suggestQuantityKg} disabled />
          </div>
        </div>

        <div className="md:flex md:items-center mb-2">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              {t('actual-weight')}
            </label>
          </div>
          <div className="sm:w-full md:w-1/3">
            <Input
              error={isError.addedQuantity}
              className="w-72"
              type="number"
              label="grams"
              value={store.addedQuantity || ''}
              onChange={(e) => {
                changeHandler(e, 'addedQuantity');
              }}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-2">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              {t('date')}
            </label>
          </div>
          <div className="sm:w-full md:w-1/3">
            <DatepickerDefault dateHandler={onDateChangeHandler} />
          </div>
        </div>

        <div className="flex items-center justify-center mt-5">
          <Button disabled={!activeButton} onClick={onClickHandler}>
            {activeButton ? t('add-btn') : t('sending')}
          </Button>
        </div>
      </div>
    </>
  );
}
