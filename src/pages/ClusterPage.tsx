import { captureException } from '@sentry/core';
import Spin from 'antd/lib/spin';
import Tag from 'antd/lib/tag';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useBoolean } from 'react3l';
import { finalize } from 'rxjs';
import { Icon, List, Page, Text } from 'zmp-ui';
import { rancherRepository } from '../repositories/rancher-repository';
import { GlobalState } from '../store';
import { rancherSlice } from '../store/rancher-slice';

const ClusterPage: React.FunctionComponent = (props) => {
  const { id } = useParams();

  const deployments = useSelector((state: GlobalState) => state.rancher.deployments);
  const dispatch = useDispatch();

  const [loading, toggleLoading] = useBoolean(true);

  React.useEffect(() => {
    const subscription = rancherRepository
      .deployments(id!)
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

  return (
    <Page className="page">
      <div className="section-container">
        <Text>Deployments</Text>
      </div>
      <Spin spinning={loading}>
        <div className="section-container">
          <List>
            {deployments.map((deployment) => (
              <List.Item
                key={deployment.id}
                suffix={<Icon icon="zi-auto-solid" />}>
                <Tag color="#87d068">{deployment.metadata.state.name}</Tag>
                {deployment.metadata.name}
              </List.Item>
            ))}
          </List>
        </div>
      </Spin>
    </Page>
  );
};

export default ClusterPage;
