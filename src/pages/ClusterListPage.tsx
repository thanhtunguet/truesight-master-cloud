import { captureException } from '@sentry/core';
import Spin from 'antd/lib/spin';
import Tag from 'antd/lib/tag';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBoolean } from 'react3l';
import { finalize } from 'rxjs';
import { Icon, List, useNavigate } from 'zmp-ui';
import UserCard from '../components/user-card';
import { rancherRepository } from '../repositories/rancher-repository';
import { GlobalState } from '../store';
import { rancherSlice } from '../store/rancher-slice';

const ClusterListPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const clusters = useSelector((state: GlobalState) => state.rancher.clusters);
  const dispatch = useDispatch();

  const [loading, setLoading] = useBoolean(true);

  const user = useSelector((state: GlobalState) => state.user.user);

  React.useEffect(() => {
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
  }, []);

  return (
    <>
      <Spin spinning={loading}>
        <div className="section-container">
          <UserCard user={user} />
        </div>
        <div className="section-container">
          <List>
            {clusters.map((cluster) => (
              <List.Item onClick={() => navigate(`/clusters/${cluster.id}`)}
                key={cluster.id}
                suffix={<Icon icon="zi-arrow-right" />}>
                <Tag color="#87d068">{cluster.state}</Tag>
                {cluster.name}
              </List.Item>
            ))}
          </List>
        </div>
      </Spin>
    </>
  );
};

export default ClusterListPage;
