import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Layout, Table, Input, Button, Icon, Collapse,List, } from 'antd';
import Highlighter from 'react-highlight-words';  
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navigation from './header';
import Tagger from './footer';
import mockData from './mock'

const {Content} = Layout;
const Panel = Collapse.Panel;
const CHANGE_TYPE={
  ADD : 0,
  REDUCE : 1,
  RESET : 2
}

class BookList extends Component{
    constructor(props){
        super(props);

        this.state={
            searchText: '',
            /* user name */
            userName:this.props.match.params.userName, 
            /* save current order */
            bookOrder:{}, 
            /* get book data by axios */
            book:[],
            /* table message */
            tag:[
                  {
                    title: '图片',
                    dataIndex: 'isbn',
                    key: 'img',
                    render: (text) => <img src={process.env.PUBLIC_URL+'/img/'+text+'.jpg'} style={{maxWidth:'120px'}} alt="" />,
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
                    dataIndex: 'isbn',
                    key: 'isbn',
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
                    dataIndex: 'book_id',
                    key: 'detail',
                    render: (text) => <Link to={"/details/"+ text+"/"+this.state.userName}>图书详情</Link>,
                  },{
                    title: '购买',
                    dataIndex: 'book_id',
                    key: 'buy',
                    render: (text)=> (
                      <div>
                        <Button id={"button1"+text} onClick={()=>{this.renewOrder(text,CHANGE_TYPE.REDUCE)}} size="small" style={{ width: 30 }} >-</Button>
                        <Input id={"input"+text} onChange={()=>{this.renewOrder(text,CHANGE_TYPE.RESET)}} 
                        value={this.renewInputValue(text)}
                        type="primary" style={{ width: 60,textAlign:"center" }}></Input>
                        <Button id={"button2"+text} onClick={()=>{this.renewOrder(text,CHANGE_TYPE.ADD)}} size="small" style={{ width: 30 }} >+</Button>
                      </div> 
                    )
                  }
              ]
        } 

    }


    /* get book data */
    componentDidMount(){

        var book = mockData[0];
        book.forEach((elem)=>{
          elem.key = elem.book_id;
        })
        this.setState({
          book:book,
          bookOrder:mockData[1]
        })
    }


    /* check is in the order and  add one book */
    addBook = (book_id)=>{
      // check if this item is already in the order
      var orderItem = this.state.bookOrder.items.find((elem)=>{
        return elem.book_id === book_id
      })

      // get target book detail message
      var targetBook = this.state.book.find((elem)=>{
        return elem.book_id === book_id;
      })
      
      var bookOrder = this.state.bookOrder;
      if(!orderItem){//not in
        bookOrder.items.push({
          book_id:book_id,
          amount:1
        })
        
      }else{//in the order
        var index = bookOrder.items.indexOf(orderItem);
        bookOrder.items.splice(index,1,{
          book_id: book_id,
          amount: orderItem.amount + 1
        })
      }
      //renew price
      bookOrder.total += targetBook.price;
      // renew state 
      this.setState({
        bookOrder:bookOrder
      })
    }

    /* check amount===1 ? and reduce one book */
    reduceBook = (book_id)=>{
      // check if this item is already in the order 
      var orderItem = this.state.bookOrder.items.find((elem)=>{
        return elem.book_id === book_id
      });

      // get target book detail message
      var targetBook = this.state.book.find((elem)=>{
        return elem.book_id === book_id;
      })

      var bookOrder = this.state.bookOrder;
      if(orderItem){//if in the order
        
        var index = bookOrder.items.indexOf(orderItem);
        // check if amount reduced to 0 
        if(orderItem.amount === 1){//0
          bookOrder.items.splice(index,1);
        }else{// >0
          // reduce one book 
          
          bookOrder.items.splice(index,1,{
            book_id: book_id,
            amount: orderItem.amount - 1
          })
        }
        //renew total
        bookOrder.total -= targetBook.price;

        // renew state 
        this.setState({
          bookOrder:bookOrder
        })
      }
    }

    /* reset the amount of a book in the order */
    resetBookOrder = (book_id)=>{
      // check if this item is already in the order 
      var orderItem = this.state.bookOrder.items.find((elem)=>{
        return elem.book_id === book_id;
      })

      // get target book detail message
      var targetBook = this.state.book.find((elem)=>{
        return elem.book_id === book_id;
      })

      var inputValue = document.getElementById("input"+book_id).value;
      var num = parseInt(inputValue)?parseInt(inputValue):0;

      //check if this num is valid
      if(num<0 || num > targetBook.remaining){
        document.getElementById("input"+book_id).value = orderItem.amount;
        return;
      }

      var bookOrder = this.state.bookOrder;
      if(!orderItem){//not in
        bookOrder.items.push({
          book_id:book_id,
          amount:num
        })
      }else if(num !== 0){//in the order and num is not 0
        var bookIndex = bookOrder.items.indexOf(orderItem);
        bookOrder.items[bookIndex]={
          book_id: book_id,
          amount: num
        }
      }else{//num is 0
        bookIndex = bookOrder.items.indexOf(orderItem);
        bookOrder.items.splice(bookIndex,1);
      }

      //renew total
      bookOrder.total = this.sumPrice();

      // renew state 
      this.setState({
        bookOrder:bookOrder
      })
    }

    /* renew order */
    renewOrder = (book_id, mode)=>{

      switch(mode){
        case CHANGE_TYPE.ADD:{
          this.addBook(book_id);
          break;
        }
        case CHANGE_TYPE.REDUCE:{
          this.reduceBook(book_id);
          break;
        }
        case CHANGE_TYPE.RESET:{
          this.resetBookOrder(book_id);
          break;
        }
        default:
      }
    }

    /* renew the value of input */
    renewInputValue = (book_id)=>{
      var item = this.state.bookOrder.items.find((elem)=>{
        return elem.book_id === book_id;
      })
      return typeof item !== 'undefined'? item.amount : 0;
    }
     

    /* submit the order and order items */
    subMitOrder = ()=>{

        axios.post("http://localhost:8080/order",
        ).then(res=>{

        })   
    }

    /* get total price */
    sumPrice = ()=>{
      var result = 0;
      var buyingList = this.state.bookOrder.items;
      buyingList.forEach((elem)=>{
        result += elem.amount * 
        this.state.book.find((element)=>{
          return element.book_id === elem.book_id;
        }).price
      })
      return result;
    }

    /* get order items */
    getTargetBook = (book_id)=>{
      var targetBook = this.state.book.find((elem)=>{
        return elem.book_id === book_id;
      })

      return targetBook;
    }

    /* antd functions */
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
    
    /* antd functions */
    handleSearch = (selectedKeys, confirm) => {
      confirm();
      this.setState({ searchText: selectedKeys[0] });
    }
    
    /* antd functions */
    handleReset = (clearFilters) => {
      clearFilters();
      this.setState({ searchText: '' });
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
                        <p>总价：{this.state.bookOrder.total}</p>
                        <Button id="5" onClick={()=>{this.subMitOrder()}} size="default" style={{ width: 200 }}>确认订单</Button>
                        <Button id="6" onClick={()=>{
                            this.setState({
                              bookOrder:{
                                total:0,
                                items:[]
                              }
                            })
                          }  
                        } size="default" style={{ width: 200 }}>
                          清空
                        </Button>
                      </div> 
                    }
                    dataSource={this.state.bookOrder.items}
                    renderItem={(item) => (
                      <List.Item> 
                      <p>名称：{this.getTargetBook(item.book_id).title}</p>
                      <hr></hr>
                      <p>数量：{item.amount}</p>
                      <p>价格：{this.getTargetBook(item.book_id).price}</p>
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

