import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import axios from 'axios';
import config from '../config/config'
import Tagger from '../layout/footer';
import Navigation from '../layout/header';

const {Content} = Layout;

/**
 * Book Details
 */
class Details extends Component{
    constructor(props){
        super(props);
        this.state={
            id:parseInt(this.props.match.params.id),
            userName:this.props.match.params.userName,
            book:{
                book_id:null,
                title : '',
                author :'',
                isbn : null,
                remaining :null,
                price :null,
                introduction :''
            },
        }
    }

    componentWillMount(){
        axios.get(config.url+"/book/"+this.state.id).then((res)=>{
          var dat = res.data;
          this.setState({
            book: dat
          })
        })
    }


    render(){
        return (
            <Layout>
            <Navigation userName={this.state.userName} />
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280,
                }}>
                <div>
                    <div id="header">
                        <h1>{ this.state.book.title }</h1>
                        <p>作  者：{this.state.book.author}</p>
                        <img src= {process.env.PUBLIC_URL+"/img/"+this.state.book.isbn+".jpg"} alt="" />
                    </div>
                    <div id="introduction">
                        <h2>书目简介</h2>
                        <br />
                        <p>{ this.state.book.introduction }</p>
                        <hr />
                    </div>
                </div>
                </Content>
            </Layout>
            <Tagger />
            </Layout>
        );
    }
}

export default Details;

