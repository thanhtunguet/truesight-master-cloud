import { captureException } from "@sentry/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBoolean } from "react3l";
import { finalize } from "rxjs";
import { RancherDeployment } from "../models/deployment";
import { rancherRepository } from "../repositories/rancher-repository";
import { deploymentsSelector } from "../store/selectors";
import { rancherSlice } from "../store/slices/rancher-slice";

export function useDeployments(clusterId: string): [RancherDeployment[], boolean] {
  const deployments = useSelector(deploymentsSelector);
  const dispatch = useDispatch();

  const [loading, toggleLoading] = useBoolean(true);

  React.useEffect(() => {
    const subscription = rancherRepository
      .deployments(clusterId)
      .pipe(
        finalize(() => {
          toggleLoading();
        }),
      )
      .subscribe({
        next: (deployments) => {
          dispatch(rancherSlice.actions.setDeployments(deployments.data));
        },
        error: (error) => {
          captureException(error);
        },
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return [deployments, loading];
}