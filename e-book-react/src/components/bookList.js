import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Layout, Table, Input, Button, Icon, Collapse,List, } from 'antd';
import Highlighter from 'react-highlight-words';  
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navigation from './header';
import Tagger from './footer';
import { element } from 'prop-types';

const {Content} = Layout;
const Panel = Collapse.Panel;

class BookList extends Component{
    constructor(props){
        super(props);
        const userName = this.props.match.params.userName;
        this.state={
            searchText: '',
            userName:userName, 
            bookBuyingList:[],   
            price:0,
            book:[],
            tag:[
                  {
                    title: '图片',
                    dataIndex: 'img',
                    key: 'img',
                    render: (text) => <img src={process.env.PUBLIC_URL+text} style={{maxWidth:'120px'}} alt="" />,
                  },{
                    title: '名称',
                    dataIndex: 'title',
                    key: 'title',
                    ...this.getColumnSearchProps('title')                   
                  }, {
                    title: '作者',
                    dataIndex: 'author',
                    key: 'author',
                  }, {
                    title: 'ISBN',
                    dataIndex: 'id',
                    key: 'ISBN',
                  },{
                    title: '库存',
                    dataIndex: 'remaining',
                    key: 'remaining',
                  },{
                    title: '价格',
                    dataIndex: 'price',
                    key: 'price',
                  },{
                    title: '详情',
                    dataIndex: 'id',
                    key: 'detail',
                    render: (text) => <Link to={"/details/"+ text}>图书详情</Link>,
                  },{
                    title: '购买',
                    dataIndex: 'id',
                    key: 'buy',
                    render: (text)=> (
                      <div>
                        <Button id="1" onClick={()=>{this.reduceBook(text)}} size="small" style={{ width: 30 }} >-</Button>
                        <Input value={this.getVal(text)} type="primary" style={{ width: 60,textAlign:"center" }}></Input>
                        <Button id="2" onClick={()=>{this.addBook(text)}} size="small" style={{ width: 30 }} >+</Button>
                      </div> 
                    )
                  }
            ]
        } 
    }

    componentDidMount(){
      axios.get("http://localhost:8080/detail/id").then(response=>{
            var dat = response.data;
            for(var i=0; i<dat.length;i++){
              dat[i].key=i;
            }
            this.setState({
              book:dat
            })
          })  
    }

    getVal = (id)=>{
      var bookBuyingList = this.state.bookBuyingList;
      for(var b=0;b <bookBuyingList.length ; b++){
        if(bookBuyingList[b].id === id){
          return bookBuyingList[b].num;
        }
      }
      return 0;
    }

    addBook = (id)=>{
      var bookBuyingList = this.state.bookBuyingList;
      var flag = true;
      for(var b=0;b <bookBuyingList.length ; b++){
        if(bookBuyingList[b].id === id){
          bookBuyingList[b].num += 1;
          this.setState({
            price: this.state.price + this.state.book[id].price
          });
          flag = false;
          break;
        }
      }
      if(flag){
        bookBuyingList.push({
          id:id,
          num:1
        });
        this.setState({
          price: this.state.price + this.state.book[id].price
        });
      }
      
      this.setState({
        bookBuyingList:bookBuyingList
      });
    }

    reduceBook = (id)=>{
      var bookBuyingList = this.state.bookBuyingList;
      for(var b=0;b <bookBuyingList.length ; b++){
        if(bookBuyingList[b].id === id){
          if(bookBuyingList[b].num>0){
            bookBuyingList[b].num -= 1;
            this.setState({
              price: this.state.price - this.state.book[id].price
            });
            if(bookBuyingList[b].num === 0){
              bookBuyingList.splice(b,1);
            }
            break;
          }
        }
      }
      
      this.setState({
        bookBuyingList:bookBuyingList,
      });
    }

    subMitOrder = ()=>{
      axios.get("http://localhost:8080/order",{
        params:{
          userName:this.state.userName
        }
      }).then((res)=>{
        handleGet(res.data)
        
      })
      

      var handleGet = (num)=>{
        var bookBuyingList = this.state.bookBuyingList;
        var books=[];
        var date = new Date()
        for(var i = 0;i<bookBuyingList.length;i++){
          books.push({
            userName:this.state.userName,
            detailId: bookBuyingList[i].id,
            bookNumber:bookBuyingList[i].num,
            orderId:this.state.userName+"_"+ num.toString()+"_"+date.toDateString()
          })
        }
        
        axios.post("http://localhost:8080/order",
          books
        ).then(()=>{
          this.setState({bookBuyingList:[],price:0})
          axios.get("http://localhost:8080/detail/id").then(response=>{
            var dat = response.data;
            for(var i=0; i<dat.length;i++){
              dat[i].key=i;
            }
            this.setState({
              book:dat
            })
          })
        }
        )
      }
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => { this.searchInput = node; }}
              placeholder={`搜索书名`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button id="3"
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              搜索
            </Button>
            <Button id="4"
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              重置
            </Button>
          </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
    })
    
    handleSearch = (selectedKeys, confirm) => {
      confirm();
      this.setState({ searchText: selectedKeys[0] });
    }
    
    handleReset = (clearFilters) => {
      clearFilters();
      this.setState({ searchText: '' });
    }

    sumPrice = ()=>{
      var result = 0;
      this.state.bookBuyingList.forEach(element,()=>{
        result += this.state.book[element.id].price
      })
      return result;
    }

    render(){
        return (
            <Layout>
            <Navigation userName={this.state.userName}/>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 450,
                }}>
                <Table columns={this.state.tag} dataSource={this.state.book} />
                <Collapse defaultActiveKey={['1']} >
                  <Panel header="购物车" key="1">
                  <List
                    bordered
                    footer={
                      <div id="submitButton">
                        <p>总价：{this.state.price}</p>
                        <Button id="5" onClick={this.subMitOrder} size="default" style={{ width: 200 }}>确认订单</Button>
                        <Button id="6" onClick={()=>{this.setState({bookBuyingList:[],price:0})}} size="default" style={{ width: 200 }}>清空</Button>
                      </div> 
                    }
                    dataSource={this.state.bookBuyingList}
                    renderItem={item => (
                      <List.Item> 
                      <p>名称：{this.state.book[item.id].title}</p>
                      <hr></hr>
                      <p>数量：{item.num}</p>
                      <p>价格：{this.state.book[item.id].price}</p>
                      </List.Item>)}
                  />
                  </Panel>
                </Collapse>
                </Content>
            </Layout>
            <Tagger />
            </Layout>
            
        );
    }
}

export default BookList;

