import { useContext } from 'react';
import { ContexData } from '../Pages/ContexData';

export function FertilizeData({ setFertilizers }) {
  const fertilizers = useContext(ContexData);
  setFertilizers(fertilizers);

  return <></>;
}
