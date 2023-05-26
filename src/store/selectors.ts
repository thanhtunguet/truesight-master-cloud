import { GlobalState } from ".";

export const tokenSelector = (state: GlobalState) => state.rancher.token;

export const userSelector = (state: GlobalState) => state.user.user;

export const clustersSelector = (state: GlobalState) => state.rancher.clusters;

export const deploymentsSelector = (state: GlobalState) => state.rancher.deployments;