import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu } from 'antd';
import {Link} from 'react-router-dom';

const { Header, Content, Footer} = Layout;

class Details extends Component{
    constructor(props){
        super(props);
        this.state={
            userName:"user",

        }
    }
    render(){
        return (
            <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} >
                <Menu.Item key="0"><Link to="/">{ this.state.userName }</Link></Menu.Item>
                <Menu.Item key="1"><Link to="/logIn">用户注册</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/bookList">图书列表</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/orders">历史订单</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/analize">统计信息</Link></Menu.Item>
                </Menu>
            </Header>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280,
                }}>
                <div>
                    <div id="header">
                        <h1>绝世唐门</h1>
                        <p>作  者：唐家三少</p>
                        <img src="/img/jueShiTangMen.jpg" alt="" />
                    </div>
                    <div id="introduction">
                        <h2>书目简介</h2>
                        <br />
                        <p>
                            《绝世唐门》是作者唐家三少全新力作的玄幻小说，又名《斗罗大陆Ⅱ绝世唐门》是斗罗系列的第二部！ 
                            这里没有魔法，没有斗气，没有武术，却有武魂。唐门创立万年之后的斗罗大陆上，唐门式微。
                            一代天骄横空出世，新一代史莱克七怪能否重振唐门，谱写一曲绝世唐门之歌？ 
                            百万年魂兽，手握日月摘星辰的死灵圣法神，导致唐门衰落的全新魂导器体系。
                            一切的神奇都将一一展现。 唐门暗器能否重振雄风，唐门能否重现辉煌，一切尽在绝世唐门！ 
                        </p>
                        <hr />
                        <h2>章节目录</h2>
                        <a href="https://www.qisuu.la/Shtml31730.html">在线阅读</a>
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

export default Details;

