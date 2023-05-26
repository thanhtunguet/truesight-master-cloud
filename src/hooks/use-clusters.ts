import { captureException } from "@sentry/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBoolean } from "react3l";
import { finalize } from "rxjs";
import { rancherRepository } from "../repositories/rancher-repository";
import { tokenSelector } from "../store/selectors";
import { rancherSlice } from "../store/slices/rancher-slice";

export function useClusters(): [boolean] {
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();

  const [loading, setLoading] = useBoolean(true);

  React.useEffect(() => {
    if (token) {
      const subscription = rancherRepository
        .clusters()
        .pipe(
          finalize(() => {
            setLoading();
          }),
        )
        .subscribe({
          next: (clusters) => {
            dispatch(rancherSlice.actions.setClusters(clusters.data));
          },
          error: (error) => {
            captureException(error);
          },
        });

      return () => {
        subscription.unsubscribe();
      };
    }
    return;
  }, [token]);

  return [loading];
}
