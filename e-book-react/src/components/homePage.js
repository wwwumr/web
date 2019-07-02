import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Icon, Input, Button,Layout } from 'antd';
import '../asset/css/homePage.css'
import axios from 'axios';
import {Link } from 'react-router-dom';
import { createHashHistory } from 'history';
import Tagger from './layout/footer';
import config from './config/config'

const history = createHashHistory();
const { Content} = Layout;

/*
 * The log in component 
 */
class LogInCompo extends React.Component {
    constructor(props){
        super(props);
        this.state={
            userName:"user"
        }
    }


    handleClick = () => {
        var getVal = (s)=>{
            return document.getElementById(s).value;
        }

        var password = getVal("password");
        var userName = getVal("userName");

        this.setState({
          userName:userName
        })


        axios.get(config.url + "/user/logIn",{
            params:{
                userName:userName
            }
        }).then((response)=>{
            if(!response.data){
                alert("用户名不存在");
            }else if(response.data.password === password){
                this.setState({userName:userName});
                if (response.data.ban !== null) {
                    alert("对不起，您的账户已被封禁");
                    return ; 
                }
                if (response.data.status === null) {
                    alert("对不起，您的账户权限不明");
                } else if (response.data.status === "ADMIN") {
                    history.push("/mBookList/" + this.state.userName);
                } else {
                    history.push("/bookList/"+ this.state.userName);
                }
            }else{
                alert("密码输入错误");
            }
        })
    }
  
    render() {
      return (
          <div>
            <Input id="userName" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名：" />
            <Input id="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码：" />
          
            <Button onClick={this.handleClick} type="primary" htmlType="button" className="login-form-button">
              登录
            </Button>
            OR <Link to="logIn">注册</Link>
          </div>
      );
    }
}
  
/* 
 * Home Page of app : Provide the entry of logging in
 */
class HomePage extends Component{

    render(){
        return (
            <Layout>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 450,
                }}>
                <div id="container">
                    <p id ="themeP">E-BOOK</p>
                    <div className="logContainer">
                    <LogInCompo userName={"user"}/>
                    </div>
                </div>
                </Content>
            </Layout>
            <Tagger />
            </Layout>
        );
    }
}

export default HomePage;

