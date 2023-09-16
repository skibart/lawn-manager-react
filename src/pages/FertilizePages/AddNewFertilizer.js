import React, { useState, useEffect, useContext } from 'react';
import { Input, Button, Typography } from '@material-tailwind/react';
import CardMy from '../../components/CardMy';
import { useCollection } from '../../hooks/useCollection';
import { createObjectId } from '../../util/utils';
import { useApp } from '../../util/RealmApp';
import { genrateIdIndex } from '../../util/utils';
import { AlertCustomAnimation } from '../../components/AlertCustomAnimation';
import { SpinnerSize } from '../../components/Spinner';
import { useTranslation } from 'react-i18next';

const initialValue = {
  name: '',
  type: '',
  gramsPerMeter: '',
  nitrogen: '',
  phosphorus: '',
  potassium: '',
  magnesium: '',
  sulfur: '',
  boron: '',
  iron: '',
  manganese: '',
  zinc: '',
  calcium: '',
};

const nutrientsArray = [
  'nitrogen',
  'phosphorus',
  'potassium',
  'magnesium',
  'sulfur',
  'boron',
  'iron',
  'manganese',
  'zinc',
  'calcium',
];

export const AddNewFertilizer = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation('translation', {
    keyPrefix: 'AddNewFertilizer',
  });
  const app = useApp();

  const [isAdding, setIsAdding] = useState(false);
  const [inputs, setInputs] = useState(initialValue);
  const [errorInputNutriens, setErrorInputNutriens] = useState({});

  const [notificationAllert, setNotificationAllert] = useState({
    open: false,
    type: '',
    icon: true,
    color: 'blue',
    message: '',
  });

  const [selectedInput, setSeletedInput] = useState('complex');

  const selecteHandler = (event) => {
    setSeletedInput(event.target.value);
  };

  const keyPressHandler = (event) => {
    if (!/[0-9.]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === 'name') {
      if (value.length < 5 || value.length > 200) {
        setErrorInputNutriens((values) => ({ ...values, [name]: true }));
      } else {
        setErrorInputNutriens((values) => ({ ...values, [name]: false }));
      }
    }
    if (name === 'gramsPerMeter') {
      if (value < -1 || value > 999) {
        setErrorInputNutriens((values) => ({ ...values, [name]: true }));
      } else {
        setErrorInputNutriens((values) => ({ ...values, [name]: false }));
      }
    }

    const errorInput = nutrientsArray.find(
      (item) => item === event.target.name,
    );

    if (errorInput) {
      if (value > 100 || value < 0) {
        setErrorInputNutriens((values) => ({ ...values, [name]: true }));
      } else {
        setErrorInputNutriens((values) => ({ ...values, [name]: false }));
      }
    }

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const dbShare = process.env.REACT_APP_DB_NAME_FOR_SHARED_DATA;
  const dbFertelizers = process.env.REACT_APP_DB_COLLECTION_FERTILIZERS;

  const collectionFertilizers = useCollection({
    db: dbShare,
    collection: dbFertelizers,
  });

  async function addReportToDatabase(event) {
    event.preventDefault();

    const hasErrors = Object.values(errorInputNutriens).some(
      (item) => item === true,
    );

    if (inputs.name.length < 5) {
      setErrorInputNutriens((values) => ({ ...values, ['name']: true }));
      return null;
    }

    if (inputs.gramsPerMeter.length < 1) {
      setErrorInputNutriens((values) => ({
        ...values,
        ['gramsPerMeter']: true,
      }));
      return null;
    }

    if (hasErrors) {
      setNotificationAllert((prevData) => ({
        ...prevData,
        open: true,
        icon: false,
        color: 'red',
        message: 'Change red input!',
      }));
      return;
    }

    let fertilizerToAdd = {
      _id: createObjectId(),
      name: inputs.name,
      enable: false,
      idFer: genrateIdIndex(),
      type: selectedInput,
      gramsPerMeter: inputs.gramsPerMeter ? +inputs.gramsPerMeter : 0.0,
      nutrient_content: {
        nitrogen: inputs.nitrogen ? +inputs.nitrogen : 0.0,
        phosphorus: inputs.phosphorus ? +inputs.phosphorus : 0.0,
        potassium: inputs.potassium ? +inputs.potassium : 0.0,
        magnesium: inputs.magnesium ? +inputs.magnesium : 0.0,
        sulfur: inputs.sulfur ? +inputs.sulfur : 0.0,
        boron: inputs.boron ? +inputs.boron : 0.0,
        iron: inputs.iron ? +inputs.iron : 0.0,
        manganese: inputs.manganese ? +inputs.manganese : 0.0,
        zinc: inputs.zinc ? +inputs.zinc : 0.0,
        calcium: inputs.calcium ? +inputs.calcium : 0.0,
      },
    };
    try {
      setIsAdding(true);
      const addedResponse =
        await collectionFertilizers.insertOne(fertilizerToAdd);
      if (addedResponse) {
        setInputs(initialValue);
        setTimeout(() => {
          setIsAdding(false);
          setNotificationAllert((prevData) => ({
            ...prevData,
            open: true,
            icon: true,
            color: 'blue',
            message: t('newSuccess'),
          }));
        }, 1000);
      }
    } catch (err) {
      setNotificationAllert((prevData) => ({
        ...prevData,
        open: true,
        icon: false,
        color: 'red',
        message: err.message,
      }));
    }
  }

  return (
    <>
      {isAdding && <SpinnerSize />}
      <AlertCustomAnimation
        setAllert={setNotificationAllert}
        settings={notificationAllert}
      />
      <CardMy title={t('title')}>
        <div className="sm:pr-2 sm:pl-2">
          <form onSubmit={addReportToDatabase} className="">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  {t('full-name')}
                </label>
              </div>
              <div className="sm:w-full md:w-1/3">
                <Input
                  error={errorInputNutriens.name}
                  size="lg"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                  label={t('full-name')}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  {t('type')}
                </label>
              </div>

              <div className="sm:w-full md:w-1/3">
                <select
                  value={selectedInput}
                  onChange={selecteHandler}
                  className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent 
            px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border 
            placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-black 
            focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 w-full relative w-full min-w-[200px] h-11"
                >
                  <option value="complex"> {t('complex')}</option>
                  <option value="mono"> {t('mono')}</option>
                </select>
              </div>
            </div>

            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  {t('suggested')}d
                </label>
              </div>
              <div className="sm:w-full md:w-1/3">
                <Input
                  onKeyPress={(e) => keyPressHandler(e)}
                  error={errorInputNutriens.gramsPerMeter}
                  type="number"
                  size="lg"
                  name="gramsPerMeter"
                  value={inputs.gramsPerMeter}
                  onChange={handleChange}
                  label={t('grams')}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Typography variant="h6" color="blue-gray" className="mb-2 right">
                {t('nutrients')}
              </Typography>
            </div>

            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  {t('nitrogen')}
                </label>
              </div>
              <div className="sm:w-full md:w-1/3">
                <Input
                  onKeyPress={(e) => keyPressHandler(e)}
                  error={errorInputNutriens.nitrogen}
                  type="number"
                  size="lg"
                  name="nitrogen"
                  value={inputs.nitrogen}
                  onChange={handleChange}
                  label={t('nitrogen')}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  {t('phosphorus')}
                </label>
              </div>
              <div className="sm:w-full md:w-1/3">
                <Input
                  onKeyPress={(e) => keyPressHandler(e)}
                  error={errorInputNutriens.phosphorus}
                  type="number"
                  size="lg"
                  name="phosphorus"
                  value={inputs.phosphorus}
                  onChange={handleChange}
                  label={t('phosphorus')}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  {t('potassium')}
                </label>
              </div>
              <div className="sm:w-full md:w-1/3">
                <Input
                  onKeyPress={(e) => keyPressHandler(e)}
                  error={errorInputNutriens.potassium}
                  type="number"
                  size="lg"
                  name="potassium"
                  value={inputs.potassium}
                  onChange={handleChange}
                  label={t('potassium')}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  {t('magnesium')}
                </label>
              </div>
              <div className="sm:w-full md:w-1/3">
                <Input
                  onKeyPress={(e) => keyPressHandler(e)}
                  error={errorInputNutriens.magnesium}
                  type="number"
                  size="lg"
                  name="magnesium"
                  value={inputs.magnesium}
                  onChange={handleChange}
                  label={t('magnesium')}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  {t('sulfur')}
                </label>
              </div>
              <div className="sm:w-full md:w-1/3">
                <Input
                  onKeyPress={(e) => keyPressHandler(e)}
                  error={errorInputNutriens.sulfur}
                  type="number"
                  size="lg"
                  name="sulfur"
                  value={inputs.sulfur}
                  onChange={handleChange}
                  label={t('sulfur')}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  {t('boron')}
                </label>
              </div>
              <div className="sm:w-full md:w-1/3">
                <Input
                  onKeyPress={(e) => keyPressHandler(e)}
                  error={errorInputNutriens.boron}
                  type="number"
                  size="lg"
                  name="boron"
                  value={inputs.boron}
                  onChange={handleChange}
                  label={t('boron')}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  {t('iron')}
                </label>
              </div>
              <div className="sm:w-full md:w-1/3">
                <Input
                  onKeyPress={(e) => keyPressHandler(e)}
                  error={errorInputNutriens.iron}
                  type="number"
                  size="lg"
                  name="iron"
                  value={inputs.iron}
                  onChange={handleChange}
                  label={t('iron')}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  {t('manganese')}
                </label>
              </div>
              <div className="sm:w-full md:w-1/3">
                <Input
                  onKeyPress={(e) => keyPressHandler(e)}
                  error={errorInputNutriens.manganese}
                  type="number"
                  size="lg"
                  name="manganese"
                  value={inputs.manganese}
                  onChange={handleChange}
                  label={t('manganese')}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-2">
              <div className="w-1/3 ">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  {t('zinc')}
                </label>
              </div>
              <div className="sm:w-full md:w-1/3">
                <Input
                  onKeyPress={(e) => keyPressHandler(e)}
                  error={errorInputNutriens.zinc}
                  type="number"
                  size="lg"
                  name="zinc"
                  value={inputs.zinc}
                  onChange={handleChange}
                  label={t('zinc')}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-2">
              <div className="w-1/3 ">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  {t('calcium')}
                </label>
              </div>
              <div className="sm:w-full md:w-1/3">
                <Input
                  onKeyPress={(e) => keyPressHandler(e)}
                  error={errorInputNutriens.calcium}
                  type="number"
                  size="lg"
                  name="calcium"
                  value={inputs.calcium}
                  onChange={handleChange}
                  label={t('calcium')}
                />
              </div>
            </div>

            <div className="flex items-center justify-center mt-10">
              <Button
                className="lg:w-1/3 sm:w-3/4"
                onSubmit={addReportToDatabase}
                type="submit"
              >
                {t('add-fertilize')}
              </Button>
            </div>
          </form>
        </div>
      </CardMy>
    </>
  );
};
