import React from 'react'
import { IndexedDB } from 'react-indexed-db';
type Props = {
 
    children?: React.ReactNode;
  };
const dataBaseWrapper:React.FC<Props> = ({children}) => {
    return (
        <IndexedDB
        name="MyDB"
        version={1}
        objectStoresMeta={[
          {
            store: 'user',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
              { name: 'name', keypath: 'name', options: { unique: false } },
              { name: 'email', keypath: 'email', options: { unique: false } }
            ]
          }
        ]}>
            {children}
      </IndexedDB>
    )
}

export default dataBaseWrapper
