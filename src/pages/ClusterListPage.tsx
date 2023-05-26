import React from 'react';
import { useSelector } from 'react-redux';
import { Icon, List, useNavigate } from 'zmp-ui';
import EntityState from '../components/entity-state';
import UserCard from '../components/user-card';
import { clustersSelector, userSelector } from '../store/selectors';

const ClusterListPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const clusters = useSelector(clustersSelector);
  const user = useSelector(userSelector);

  return (
    <>
      <div className="section-container">
        <UserCard user={user} />
      </div>
      <div className="section-container">
        <List>
          {clusters.map((cluster) => (
            <List.Item onClick={() => navigate(`/clusters/${cluster.id}`)}
              key={cluster.id}
              suffix={<Icon icon="zi-arrow-right" />}>
              <EntityState state={cluster.state} />
              {cluster.name}
            </List.Item>
          ))}
        </List>
      </div>
    </>
  );
};

export default ClusterListPage;
