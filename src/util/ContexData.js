import { createContext } from 'react';
import { useEffect, useState } from 'react';
import { useCollection } from '../hooks/useCollection';
import { useApp } from '../util/RealmApp';

const dbShareDatabase = process.env.REACT_APP_DB_NAME_FOR_SHARED_DATA;
const fertilizersData = process.env.REACT_APP_DB_COLLECTION_FERTILIZERS;

export const ContexData = createContext();

export const ContexProvider = ({ children }) => {
  const { currentUser } = useApp();

  const [fertilizers, setFertilizers] = useState([]);

  const fertilizersClient = useCollection({
    db: dbShareDatabase,
    collection: fertilizersData,
  });

  useEffect(() => {
    if (!fertilizersClient || !currentUser) {
      return;
    }

    async function getFertilizers() {
      try {
        const data = await fertilizersClient.find({ enable: true });
        setFertilizers(data);
      } catch (error) {
        console.error('Error fetching fertilizers:', error);
      }
    }

    getFertilizers();
  }, [fertilizersClient, currentUser]);

  return (
    <ContexData.Provider value={fertilizers}>{children}</ContexData.Provider>
  );
};
