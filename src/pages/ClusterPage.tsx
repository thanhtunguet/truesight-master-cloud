import Spin from 'antd/lib/spin';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router';
import { firstValueFrom } from 'rxjs';
import { Header, Icon, List, Page, useSnackbar } from 'zmp-ui';
import EntityState from '../components/entity-state';
import { useDeployments } from '../hooks/use-deployments';
import { rancherRepository } from '../repositories/rancher-repository';

const ClusterPage: React.FunctionComponent = () => {
  const { id } = useParams();

  const [deployments, loading] = useDeployments(id!);

  const { openSnackbar } = useSnackbar();


  return (
    <Page className="page">
      <Header title="Deployments" />
      <Spin spinning={loading}>
        <div className="section-container section-top-margin">
          <List>
            {deployments.map((deployment) => (
              <List.Item
                key={deployment.id}
                onClick={async () => {
                  await firstValueFrom(rancherRepository.redeploy(id!, deployment.id, {
                    ...deployment,
                    spec: {
                      ...deployment.spec,
                      template: {
                        ...deployment.spec.template,
                        metadata: {
                          ...deployment.spec.template.metadata,
                          annotations: {
                            'cattle.io/timestamp': moment().toISOString(),
                            'kubectl.kubernetes.io/restartedAt': moment().toISOString(),
                          },
                        }
                      }
                    }
                  }));
                  openSnackbar({
                    icon: true,
                    text: "Deployment restarted",
                    action: {
                      text: "OK",
                      close: true,
                    },
                    duration: 3000,
                  });
                }}
                suffix={<Icon icon="zi-auto-solid" />}>
                <EntityState state={deployment.metadata.state.name} />
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
