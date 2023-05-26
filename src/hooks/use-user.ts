import { captureException } from '@sentry/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBoolean } from 'react3l';
import { finalize } from 'rxjs';
import { RancherUserResponse } from '../models/user';
import { rancherRepository } from '../repositories/rancher-repository';
import { GlobalState } from '../store';
import { userSlice } from '../store/user-slice';

export function useUser(): [RancherUserResponse['data'] | undefined, boolean] {
  const [loading, toggleLoading] = useBoolean(true);

  const user = useSelector((state: GlobalState) => state.user.user);

  const dispatch = useDispatch();

  React.useEffect(() => {
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
  }, []);

  return [user, loading];
}
