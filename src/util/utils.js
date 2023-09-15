import * as Realm from 'realm-web';

export const createObjectId = () => {
  return new Realm.BSON.ObjectId();
};

export function genrateIdIndex() {
  const index =
    'fer' +
    Math.floor(Math.random() * 10000)
      .toString()
      .padStart(6, '0');
  return index;
}

function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
}

export default getCurrentDate;
