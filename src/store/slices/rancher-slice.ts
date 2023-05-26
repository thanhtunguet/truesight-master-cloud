import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { string } from 'prop-types';
import { GlobalState } from '.';
import { RancherDeployment } from '../models/deployment';
import { RancherCluster } from '../models/rancher';

const initialState = Object.freeze<GlobalState['rancher']>({
  clusters: [],
  deployments: [],
});

export const rancherSlice = createSlice({
  name: 'rancher',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setClusters(state, action: PayloadAction<RancherCluster[]>) {
      state.clusters = action.payload;
    },
    setDeployments(state, action: PayloadAction<RancherDeployment[]>) {
      state.deployments = action.payload;
    },
  },
});
