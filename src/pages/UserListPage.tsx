import {captureException} from '@sentry/core';
import React from 'react';
import {useSelector} from 'react-redux';
import {Icon, List} from 'zmp-ui';
import UserCard from '../components/user-card';
import {rancherRepository} from '../repositories/rancher-repository';
import {userSelector} from '../store/selectors';
import Tag from 'antd/lib/tag';

const UserListPage: React.FunctionComponent = () => {
  const user = useSelector(userSelector);

  const [users, setUsers] = React.useState<any[]>([]);

  React.useEffect(() => {
    rancherRepository.users().subscribe({
      next: (users) => {
        setUsers(users.data);
      },
      error: (error) => {
        captureException(error);
      },
    });
  }, []);

  return (
    <>
      <div className="section-container">
        <UserCard user={user} />
      </div>
      <div className="section-container">
        <List>
          {users.map((user) => (
            <List.Item
              onClick={() => {}}
              key={user.id}
              suffix={<Icon icon="zi-arrow-right" />}>
              <Tag color="#87d068">{user.state}</Tag>
              {user.username}
            </List.Item>
          ))}
        </List>
      </div>
    </>
  );
};

export default UserListPage;
