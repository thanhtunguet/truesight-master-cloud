import React from 'react';
import Tag from 'antd/lib/tag';

export default function EntityState({ state }: {
  state: string;
}) {
  if (state === 'active') {
    return <Tag color="#87d068">Active</Tag>;
  }
  if (state === 'completed') {
    return <Tag color="blue">Completed</Tag>;
  }
  if (state === 'updating') {
    return <Tag color="blue">Updating</Tag>;
  }
  return <Tag color="magenta">{state}</Tag>;
}