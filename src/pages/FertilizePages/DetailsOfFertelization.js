import React, { useState, useEffect } from 'react';
import { PopoverDetails } from '../../components/PopoverDetails';
import { useTranslation } from 'react-i18next';

export function DetailsOfFertelization(props) {
  const { t } = useTranslation('translation', { keyPrefix: 'nutrients' });
  const [contentPopover, setContentPopover] = useState([
    { loading: 'loading' },
  ]);
  const weigthOfCurrentFertilizer = props.weight;

  const [nutritionsNameData, setNutritionsNameData] = useState([]);
  const [nutritionsValueData, setNutritionsValueData] = useState([]);
  useEffect(() => {
    async function detailsHandler() {
      if (!props.fertilizers) {
        return;
      }
      const fertilizerFromParent = await props.fertilizers;
      const indexOfFer = fertilizerFromParent.findIndex(
        (item) => item.idFer === props.id,
      );
      if (indexOfFer < 0) {
        return;
      }
      const detailsOfThisFertilizer =
        fertilizerFromParent[indexOfFer].nutrient_content;
      const tempArr = [];
      for (const nutrient in detailsOfThisFertilizer) {
        const toAdd = { [nutrient]: detailsOfThisFertilizer[nutrient] };
        tempArr.push(toAdd);
      }

      const nameValue = [];
      const dataValue = [];
      tempArr.forEach((item) => {
        for (const nutrition in item) {
          const nameNutrition = nutrition;
          nameValue.push(nameNutrition);
          const percentWeightNutrition = item[nutrition];
          const weightNutrition =
            weigthOfCurrentFertilizer * (percentWeightNutrition / 100);
          dataValue.push(weightNutrition);
        }
      });
      let translatedNames = [];
      nameValue.forEach((nameOfNutriens) => {
        translatedNames.push(t(nameOfNutriens));
      });
      setNutritionsNameData(translatedNames);
      setNutritionsValueData(dataValue);
      setContentPopover(tempArr);
    }
    detailsHandler();
  }, [props.fertilizers, props.id]);

  return (
    <>
      <PopoverDetails names={nutritionsNameData} values={nutritionsValueData} />
    </>
  );
}
