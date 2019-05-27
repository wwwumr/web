import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
    Icon, Input, Button,Layout
  } from 'antd';
import '../asset/css/homePage.css'
import Tagger from './footer';
import Axios from 'axios';
import {Link } from 'react-router-dom';
import { createHashHistory } from 'history';

const history = createHashHistory();

const { Content} = Layout;

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


        Axios.get("http://localhost:8081/user/logIn",{
            params:{
                userName:userName
            }
        }).then((response)=>{
            if(!response.data){
                alert("用户名不存在");
            }else if(response.data.password === password){
                this.setState({userName:userName});
                history.push("/bookList/"+ this.state.userName);
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
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 450,
                }}>
                <div id="container">
                    <p id ="themeP">E-BOOK</p>
                    <div className="logContainer">
                    <LogInCompo userName={this.state.userName}/>
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

