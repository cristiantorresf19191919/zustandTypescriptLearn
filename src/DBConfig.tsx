export const DBConfig = {
    name: 'MyLocalDatabase',
    version: 1,
    objectStoresMeta: [
      {
        store: 'user',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'email', keypath: 'email', options: { unique: false } }
        ]
      }
    ]
  };