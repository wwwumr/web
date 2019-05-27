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
            permission: "USER"
        }
    }

    componentDidMount=()=>{
        var user = this.state.userName;
        if(user.slice(0,5)==="admin"){
            this.setState({
                permission:"ADMIN"
            })
        }else{
            document.getElementById("userManag").style.visibility="hidden"
            document.getElementById("analize").style.visibility="hidden"
        }
    }

    render(){
        return(
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal"  style={{ lineHeight: '64px' }} >
                    <Menu.Item key="0"><Link to="/">{ this.state.userName }</Link></Menu.Item>
                    <Menu.Item key="2"><Link to={"/logIn"}>用户注册</Link></Menu.Item>
                    <Menu.Item key="3">
                        <Link to={"/bookList/"+this.state.userName}>
                        { '图书'+ this.state.permission==='ADMIN'?'管理':"列表"}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4"><Link to={"/orders/"+this.state.userName}>订单管理</Link></Menu.Item>
                    <Menu.Item id="analize" key="5"><Link to={"/analize/"+this.state.userName}>统计信息</Link></Menu.Item>
                    <Menu.Item id='userManag' key="1"><Link to={"/userManag/"+this.state.userName}>用户管理</Link></Menu.Item>
                </Menu>
            </Header>
        );
    }
}

export default  Navigation;