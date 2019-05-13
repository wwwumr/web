import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu } from 'antd';
import {Link} from 'react-router-dom';
import '../asset/css/homePage.css'

const { Header} = Layout;

class Navigation extends Component{
    constructor(props){
        super(props);
        this.state={
            userName:this.props.userName||"user",
            permission: "normal"
        }
    }

    componentDidMount=()=>{
        var user = this.state.userName;
        if(user.slice(0,5)==="admin"){
            this.setState({
                permission:"admin"
            })
        }else{
            document.getElementById("analize").style.visibility="hidden"
        }
    }

    render(){
        return(
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal"  style={{ lineHeight: '64px' }} >
                <Menu.Item key="0"><Link to="/">{ this.state.userName }</Link></Menu.Item>
                <Menu.Item key="1"><Link to={"/logIn"}>用户注册</Link></Menu.Item>
                <Menu.Item key="2"><Link to={"/bookList/"+this.state.userName}>图书列表</Link></Menu.Item>
                <Menu.Item key="3"><Link to={"/orders/"+this.state.userName}>历史订单</Link></Menu.Item>
                <Menu.Item id="analize" key="4"><Link to={"/analize/"+this.state.userName}>统计信息</Link></Menu.Item>
                </Menu>
            </Header>
        );
    }
}

export default  Navigation;