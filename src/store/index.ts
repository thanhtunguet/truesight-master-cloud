import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import { getStorage, removeStorage, setStorage } from 'zmp-sdk';
import { RancherDeployment } from '../models/deployment';
import { RancherCluster } from '../models/rancher';
import { RancherUserResponse } from '../models/user';
import { rancherSlice } from './slices/rancher-slice';
import { userSlice } from './slices/user-slice';

const persistConfig: PersistConfig<Pick<GlobalState['rancher'], 'token'>> = {
  key: 'root',
  whitelist: ['token'],
  storage: {
    getItem(key: string) {
      return getStorage({
        keys: [key],
      }).then((values) => {
        return values[key];
      });
    },
    setItem(key: string, value) {
      return setStorage({
        data: {
          [key]: value,
        },
      });
    },
    removeItem(key: string) {
      return removeStorage({
        keys: [key],
      });
    },
  },
};

const persistedReducer = persistReducer(persistConfig, rancherSlice.reducer);

export const store = configureStore({
  reducer: {
    rancher: persistedReducer,
    user: userSlice.reducer,
  },
  middleware: [createLogger()],
});

export const persistor = persistStore(store);

export interface GlobalState {
  rancher: {
    clusters: RancherCluster[];

    deployments: RancherDeployment[];

    token?: string;
  };

  user: {
    user?: RancherUserResponse['data'];

    users: {
      id: string;

      username: string;

      displayName: string;
    }[];
  }
}
