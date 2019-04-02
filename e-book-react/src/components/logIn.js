import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu, Input,Button } from 'antd';
import '../asset/css/logIn.css';
import {Link} from 'react-router-dom';
  
const { Header, Content, Footer} = Layout;

class LogIn extends Component{
    constructor(props){
      super(props);
      this.state={
          userName:"user"
      }
    }
    render(){
        return (
            <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal"  style={{ lineHeight: '64px' }} >
                <Menu.Item key="0"><Link to="/">{ this.state.userName }</Link></Menu.Item>
                <Menu.Item key="1"><Link to="/logIn">用户注册</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/bookList">图书列表</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/orders">历史订单</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/analize">统计信息</Link></Menu.Item>
                </Menu>
            </Header>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 450,
                }}>
                <div id="input">
                <Input placeholder="user" addonBefore="用户名"  />
                <Input placeholder="*******" addonBefore="密码"/>
                <Input placeholder="*******" addonBefore="重复"/>
                <div id="button">
                <Button type="primary">注册</Button>
                </div>
                                
                </div>
                
                
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>
            E-BOOK ©2019 Created by Wang Xiaoran
            </Footer>
            </Layout>
        );
    }
}

export default LogIn;

