import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Layout, } from 'antd';
import '../../asset/css/homePage.css'

const {Footer} = Layout;

class Tagger extends Component{

    render(){
        return (
            
            <Footer style={{ textAlign: 'center' ,top: '100px' }}>
            E-BOOK ©2019 Created by Wang Xiaoran
            </Footer>
            
        );
    }
}

export default Tagger;

