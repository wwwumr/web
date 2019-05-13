import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Layout } from 'antd';
import Navigation from './header';
import Tagger from './footer';
  
const {  Content} = Layout;

class Analize extends Component{
    constructor(props){
        super(props);
        this.state={
            userName:this.props.match.params.userName||"user"
        }
    }
    render(){
        return (
            <Layout>
            <Navigation userName={this.state.userName}></Navigation>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280,
                }}>
                统计信息
                </Content>
            </Layout>
            <Tagger></Tagger>
            </Layout>
            
        );
    }
}

export default Analize;

