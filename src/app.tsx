import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import {
  AnimationRoutes,
  App as ZaloApp,
  SnackbarProvider,
  ZMPRouter
} from 'zmp-ui';
import { useClusters } from './hooks/use-clusters';
import { useUser } from './hooks/use-user';
import ClusterPage from './pages/ClusterPage';
import HomePage from './pages/HomePage';
import RancherConfigPage from './pages/RancherConfigPage';
import { tokenSelector } from './store/selectors';

const App = () => {
  const token = useSelector(tokenSelector);

  useUser();
  useClusters();

  if (!token) {
    return (
      <ZaloApp>
        <RancherConfigPage />
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

export default App;
