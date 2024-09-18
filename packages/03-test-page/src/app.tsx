import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import type { LoginInfo } from './request';
import { loginAction } from './request';

const onFinish: FormProps<LoginInfo>['onFinish'] = async (info: LoginInfo) => {
  console.log('Success:', info);
  try {
    const result = await loginAction(info);
    if (result.success === true) {
      message.success('登录成功');
    } else {
      message.success(result.message || '登录失败');
    }
  } catch (err) {
    message.error('登录出错');
  }
};

const onFinishFailed: FormProps<LoginInfo>['onFinishFailed'] = (errorInfo) => {
  if (errorInfo.errorFields?.length > 0) {
    errorInfo.errorFields.forEach((field) => {
      message.error(field.errors.join('\r\n'));
    });
  }
};

export const App: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 18 }}
    style={{ width: 400 }}
    initialValues={{}}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<LoginInfo> label="用户名称" name="username" rules={[{ required: true, message: '请输入用户名称' }]}>
      <Input />
    </Form.Item>

    <Form.Item<LoginInfo> label="密码" name="password" rules={[{ required: true, message: '请输入用户密码' }]}>
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button id="btn-login" type="primary" htmlType="submit">
        登录
      </Button>
    </Form.Item>
  </Form>
);
