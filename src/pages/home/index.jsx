import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import PubSub from "pubsub-js";

import './home.css';

export default function Home() {
  const { confirm } = Modal;
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    PubSub.subscribe('username', (msg, data) => {
      // console.log('111', data);
      setUsername(data);
    });  
  });


  const showConfirm = () => {
    confirm({
      title: '退出登录',
      icon: <ExclamationCircleOutlined />,
      content: '你确定要退出登录吗？',
      onOk() {
        // console.log('OK');
        // 点击确定就要重新返回login页面并且清除token
        navigate('/login');
        sessionStorage.removeItem('token');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <div className="h1_container">
        <h1 className="wel">欢迎来到Home页面</h1>
        <h1 className="wel">{`恭喜${username}登录成功`}</h1>
        <h1 className="wel">这里是一个特殊世界</h1>
        <h1 className="wel">希望看到这里的你</h1>
        <h1 className="wel">能够一直好运来</h1>
        <Button type='link' onClick={showConfirm}>退出登录</Button>
    </div>   
  )
}
