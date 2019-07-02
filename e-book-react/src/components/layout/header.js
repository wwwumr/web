import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu } from 'antd';
import {Link} from 'react-router-dom';
import '../../asset/css/homePage.css'

const { Header} = Layout;

class Navigation extends Component{
    constructor(props){
        super(props);
        this.state={
            userName:this.props.userName || "user",
            permission: "USER"
        }
    }

    componentDidMount=()=>{
        var user = this.state.userName;
        if(user.slice(0,5)==="admin"){
            this.setState({
                permission:"ADMIN"
            })
        }
    }

    render(){
        return(
            <Header className="header">
                <div className="logo" />
                {/* USER HEADER */}
                {
                    this.state.permission === "USER" &&  
                    <div>
                        <Menu theme="dark" mode="horizontal"  style={{ lineHeight: '64px' }} >
                            <Menu.Item key="0"><Link to="/">{ this.state.userName }</Link></Menu.Item>
                            <Menu.Item key="1"><Link to={"/logIn"}>用户注册</Link></Menu.Item>
                            <Menu.Item key="2">
                                <Link to={"/bookList/"+this.state.userName}>图书列表</Link>
                            </Menu.Item>
                            <Menu.Item key="3"><Link to={"/orders/"+this.state.userName}>订单管理</Link></Menu.Item>
                            
                        </Menu>

                    </div>
                }
                {/* ADMIN HEADER */}
                {
                    this.state.permission === "ADMIN" &&
                    <div>
                        <Menu theme="dark" mode="horizontal"  style={{ lineHeight: '64px' }} >
                            <Menu.Item key="0"><Link to="/">{ this.state.userName }</Link></Menu.Item>
                            <Menu.Item key="1"><Link to={"/logIn"}>用户注册</Link></Menu.Item>
                            <Menu.Item key="2"><Link to={"/userManage/"+this.state.userName}>用户管理</Link></Menu.Item>
                            <Menu.Item key="3">
                                <Link to={"/mBookList/"+this.state.userName}>图书管理</Link>
                            </Menu.Item>
                            <Menu.Item key="4"><Link to={"/mOrders/"+this.state.userName}>订单管理</Link></Menu.Item>
                            <Menu.Item key="5">
                                <Link to="/file">文件</Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                }
            </Header>
        );
    }
}

export default  Navigation;