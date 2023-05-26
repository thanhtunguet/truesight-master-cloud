import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import {
  AnimationRoutes,
  App as ZaloApp,
  SnackbarProvider,
  ZMPRouter
} from 'zmp-ui';
import { useUser } from '../hooks/use-user';
import ClusterPage from '../pages/ClusterPage';
import HomePage from '../pages/HomePage';
import RancherForm from '../pages/RancherForm';
import { GlobalState } from '../store';

const MyApp = () => {
  const rancherApi = useSelector((state: GlobalState) => state.rancher.token);

  useUser();

  if (!rancherApi) {
    return (
      <ZaloApp>
        <RancherForm />
      </ZaloApp>
    );
  }

  return (
    <ZaloApp>
      <SnackbarProvider>
        <ZMPRouter>
          <AnimationRoutes>
            <Route path="/clusters/:id" element={<ClusterPage />} />
            <Route path="/" element={<HomePage />} />
          </AnimationRoutes>
        </ZMPRouter>
      </SnackbarProvider>
    </ZaloApp>
  );
};

export default MyApp;
