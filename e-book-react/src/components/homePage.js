import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu } from 'antd';
import {Link} from 'react-router-dom';
import '../asset/css/homePage.css'

const { Header, Content, Footer} = Layout;

class HomePage extends Component{
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
                <div>
                    <p id ="themeP">E-BOOK</p>
                </div>

                <div class="logContainer">
                    <div class="logInput">
                        <input  type="text" value="用户名："/>
                        <input  type="text" value="密码："/>
                    </div>
                    <div class="logButton">
                        <Link to="/bookList"><button >
                            登录
                        </button></Link>
                    </div>
                </div>
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center' ,top: '100px' }}>
            E-BOOK ©2019 Created by Wang Xiaoran
            </Footer>
            </Layout>
            
        );
    }
}

export default HomePage;

