import { Button, Form, Input } from 'antd';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../store';
import { tokenSelector } from '../store/selectors';
import { rancherSlice } from '../store/slices/rancher-slice';

const RancherConfigPage: FC = () => {
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();

  const handleSubmit = React.useCallback((values: GlobalState['rancher']) => {
    dispatch(rancherSlice.actions.setToken(values.token!));
  }, []);

  return (
    <div className="section-container">
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="token"
          label="Rancher API Key"
          initialValue={token}
          rules={[
            {
              required: true,
              message: 'Please enter your Rancher API Key',
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RancherConfigPage;
