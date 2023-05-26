import { Button, Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../store';
import { rancherSlice } from '../store/rancher-slice';

const RancherForm = () => {
  const rancherApi = useSelector((state: GlobalState) => state.rancher.token);
  const dispatch = useDispatch();

  const onFinish = (values: GlobalState['rancher']) => {
    dispatch(rancherSlice.actions.setToken(values.token!));
  };

  return (
    <div className="section-container">
      <Form onFinish={onFinish} className="p-4">
        <Form.Item
          name="token"
          label="Rancher API Key"
          initialValue={rancherApi}
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

export default RancherForm;
