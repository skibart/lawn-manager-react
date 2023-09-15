import React from "react";
import { useApp } from "../util/RealmApp";

/**
 * Returns a MongoDB Collection client object
 * @template DocType extends Realm.Services.MongoDB.Document
 * @param {Object} config - A description of the collection.
 * @param {string} [config.cluster] - The service name of the collection's linked cluster.
 * @param {string} config.db - The name of database that contains the collection.
 * @param {string} config.collection - The name of the collection.
 * @returns {Realm.Services.MongoDB.MongoDBCollection<DocType>} config.collection - The name of the collection.
 */

const clusterName = process.env.REACT_APP_CLUSTER_NAME;
const dbUserData = process.env.REACT_APP_DBUSERSDATA
const dbUserFertelization = process.env.REACT_APP_DB_COLLECTION_DATA

export function useCollection({ cluster = clusterName,  db =  dbUserData, collection = dbUserFertelization }) {
  const app = useApp();

  return React.useMemo(() => {

    if (app.currentUser) {
      const mdb = app.currentUser.mongoClient(cluster);
      return mdb.db(db).collection(collection);
    } else {
      return
    }
   
  }, [app.currentUser, cluster, db, collection]);
}



