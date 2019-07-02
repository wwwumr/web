import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input,  Icon, Button, Layout } from 'antd';
import '../asset/css/logIn.css'
import axios from 'axios';
import { createHashHistory } from 'history';
import config from './config/config'

const history = createHashHistory();

const { Content, Footer } = Layout;

/**
 * registration component
 */
class LoginForm extends Component {
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

      var password=getVal("password");
      var repassword = getVal("repassword");
      var userName = getVal("userName");
      var email = getVal("email")
      var status = userName.substr(0,5).toLowerCase()==="admin"?"ADMIN":"USER";

      if(!password || !repassword || !userName || !email){
        alert("所填值不能为空！");
      }else if(password !== repassword ){
        alert("密码不一致");
      }else if(password.length>20 || userName.length>20 || email.length >30){
        alert("用户名、密码太长(20字符内,邮箱30字符)");
      }else{
        axios.get(config.url+"/user/logIn",{
          params:{
            userName: userName
          }
        }).then(function(response){
          if(response.data){
            alert("用户名已注册");
          }else{
            axios.post(config.url+"/user/logIn",{
              name:userName,
              password:password,
              status: status,
              ban:null,
              email:email
            })
            history.push("/");
          }
        })
      }
    }
  
    render() {
      return (
        <div id="input">
            <Input id="userName" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            <Input id="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            <Input id="repassword" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            <Input id="email" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="Email" />
            <Button onClick={this.handleClick} type="primary" htmlType="button" className="login-form-button">确认</Button>
        </div>
      );
    }
  }
  


/**
 * registration component
 */
class LogIn extends Component{

    render(){
        return (
            <Layout>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 450,
                }}>
                <div>
                <p id="logIn">注册</p>
                </div>
                <LoginForm />
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

