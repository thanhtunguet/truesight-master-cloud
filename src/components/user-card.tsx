import React from 'react';
import { Avatar, Box, Text } from 'zmp-ui';
import { RancherUserResponse } from '../models/user';

interface UserProps {
  user?: RancherUserResponse['data'];
}

const UserCard: React.FunctionComponent<UserProps> = ({ user }) => {
  const [u] = user ?? [];

  return (
    <Box flex>
      <Avatar story="default" online />

      <Box ml={4}>
        <Text.Title>{u?.name}</Text.Title>
        <Text>{u?.id}</Text>
      </Box>
    </Box>
  );
};

export default UserCard;
