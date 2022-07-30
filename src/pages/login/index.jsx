import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Layout, Button, Form, Input, Modal, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { reqAuth } from '../../api/index';
import PubSub from "pubsub-js";

import "./login.css";

import { reqLogin } from '../../api/index';
import Register from '../../component/register';

const { Header, Footer, Content } = Layout;

export default function Login() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //   (async function auth() {
    //     const response = await reqAuth();
    //     const { msg, username } = response.data;
    //     // eslint-disable-next-line default-case
    //     switch (msg) {
    //       case '请登录！':
    //         message.info('请登录！');
    //         break;
    //       case '请注册！':
    //         message.info('请注册！');
    //         break;
    //       case '权限校验成功！':
    //         PubSub.publish('username', username);
    //         navigate('/');
    //         break;
    //     }
    //   })(); 
    // })

    const onFinish = async(values) => {
      const {username, password} = values;

      const response = await reqLogin(username, password);
      //console.log(response);
      const {msg, token} = response.data;

      // eslint-disable-next-line default-case
      switch (msg) {
        case 'Cookie set success!':
          message.success('登录成功');
          // 存储token
          window.sessionStorage.setItem('token', token);
          // 存username状态，利用PubSub传值
          PubSub.publish('username', username);
          // 跳转到home页面！
          navigate('/');
          break;
        case 'User does not exist': 
          message.error('用户不存在，请先注册！');
          break;
        case 'Wrong password':
          message.error('密码错误，请再次输入！');
          break;
      }
  };


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="ant-layout-container">
      <Layout>
        <Header>
          <h1 className="title">MOCK登录页面</h1>
        </Header>
        <Content>
          <div className="login-form-container">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                <Button type="link" block onClick={showModal}>register now!</Button>
                <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                  <Register></Register>
              </Modal>
              </Form.Item>
            </Form>
          </div>
        </Content>
        <Footer>
          <span>欢迎来到登录页面~@Katrinasayhello_</span>
        </Footer>
      </Layout>
    </div>
  );
}



