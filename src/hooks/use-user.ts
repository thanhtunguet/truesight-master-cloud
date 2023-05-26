import { captureException } from '@sentry/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBoolean } from 'react3l';
import { finalize } from 'rxjs';
import { RancherUserResponse } from '../models/user';
import { rancherRepository } from '../repositories/rancher-repository';
import { tokenSelector, userSelector } from '../store/selectors';
import { userSlice } from '../store/slices/user-slice';

export function useUser(): [RancherUserResponse['data'] | undefined, boolean] {
  const [loading, toggleLoading] = useBoolean(true);

  const token = useSelector(tokenSelector);
  const user = useSelector(userSelector);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (token) {
      const subscription = rancherRepository
        .me()
        .pipe(
          finalize(() => {
            toggleLoading();
          }),
        )
        .subscribe({
          next: (user) => {
            dispatch(userSlice.actions.setUser(user.data));
          },
          error: captureException,
        });

      return () => {
        subscription.unsubscribe();
      };
    }

    return;
  }, [token]);

  return [user, loading];
}
