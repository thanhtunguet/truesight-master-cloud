import React from 'react';
import { useSelector } from 'react-redux';
import UserCard from '../components/user-card';
import { GlobalState } from '../store';

const UserListPage: React.FunctionComponent = () => {
  const user = useSelector((state: GlobalState) => state.user.user);

  return (
    <>
      <div className="section-container">
        <UserCard user={user} />
      </div>

    </>
  );
};

export default UserListPage;
