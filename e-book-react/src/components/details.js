import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import Navigation from './header';
import Tagger from './footer';
import mockData from './mock'

const {Content} = Layout;

class Details extends Component{
    constructor(props){
        super(props);
        this.state={
            id:parseInt(this.props.match.params.id),
            userName:this.props.match.params.userName,
            book:[],
            targetBook:{},
        }
    }

    componentWillMount(){
        this.setState({
            book:mockData[0]
        })
    }

    componentDidMount=()=>{
        var targetBook = this.state.book.find((elem)=>{
            return elem.book_id === this.state.id;
        })

        this.setState({
            targetBook:targetBook
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
                        <h1>{ this.state.targetBook.title }</h1>
                        <p>作  者：{this.state.targetBook.author}</p>
                        <img src= {process.env.PUBLIC_URL+"/img/"+this.state.targetBook.isbn+".jpg"} alt="" />
                    </div>
                    <div id="introduction">
                        <h2>书目简介</h2>
                        <br />
                        <p>{ this.state.targetBook.introduction }</p>
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

