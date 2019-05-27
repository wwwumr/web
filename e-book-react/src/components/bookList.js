import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Layout, Table, Input, Button, Icon, Collapse,List, } from 'antd';
import Highlighter from 'react-highlight-words';  
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navigation from './header';
import Tagger from './footer';


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
            bookOrder:{
              user_name:this.props.match.params.userName,
              total:0,
              order_time:"",
              items:[],
              order_id:null
            }, 
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
                    dataIndex: 'bookId',
                    key: 'detail',
                    render: (text) => <Link to={"/details/"+ text+"/"+this.state.userName}>图书详情</Link>,
                  },{
                    title: '购买',
                    dataIndex: 'bookId',
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

    componentWillMount(){
      axios.get("http://localhost:8081/book/id").then((res)=>{
          var dat = res.data;
          for(var i=0; i<dat.length;i++){
            dat[i].key=i;
          }
          this.setState({
            book: dat
          })
        })
    }

    /* get book data */
    componentDidMount(){
        var book = this.state.book;
        book.forEach((elem)=>{
          elem.key = elem.bookId;
        })
        this.setState({
          book:book,
        }) 
    }


    /* check is in the order and  add one book */
    addBook = (bookId)=>{
      // check if this item is already in the order
      var orderItem = this.state.bookOrder.items.find((elem)=>{
        return elem.bookId === bookId
      })

      // get target book detail message
      var targetBook = this.state.book.find((elem)=>{
        return elem.bookId === bookId;
      })
      
      var bookOrder = this.state.bookOrder;
      if(!orderItem){//not in
        bookOrder.items.push({
          bookId:bookId,
          amount:1
        })
        
      }else{//in the order
        var index = bookOrder.items.indexOf(orderItem);
        bookOrder.items.splice(index,1,{
          bookId: bookId,
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
    reduceBook = (bookId)=>{
      // check if this item is already in the order 
      var orderItem = this.state.bookOrder.items.find((elem)=>{
        return elem.bookId === bookId
      });

      // get target book detail message
      var targetBook = this.state.book.find((elem)=>{
        return elem.bookId === bookId;
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
            bookId: bookId,
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
    resetBookOrder = (bookId)=>{
      // check if this item is already in the order 
      var orderItem = this.state.bookOrder.items.find((elem)=>{
        return elem.bookId === bookId;
      })

      // get target book detail message
      var targetBook = this.state.book.find((elem)=>{
        return elem.bookId === bookId;
      })

      var inputValue = document.getElementById("input"+bookId).value;
      var num = parseInt(inputValue)?parseInt(inputValue):0;

      //check if this num is valid
      if(num<0 || num > targetBook.remaining){
        document.getElementById("input"+bookId).value = orderItem.amount;
        return;
      }

      var bookOrder = this.state.bookOrder;
      if(!orderItem && num!==0){//not in
        bookOrder.items.push({
          bookId:bookId,
          amount:num
        })
      }else if(num !== 0){//in the order and num is not 0
        var bookIndex = bookOrder.items.indexOf(orderItem);
        bookOrder.items[bookIndex]={
          bookId: bookId,
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
    renewOrder = (bookId, mode)=>{

      switch(mode){
        case CHANGE_TYPE.ADD:{
          this.addBook(bookId);
          break;
        }
        case CHANGE_TYPE.REDUCE:{
          this.reduceBook(bookId);
          break;
        }
        case CHANGE_TYPE.RESET:{
          this.resetBookOrder(bookId);
          break;
        }
        default:
      }
    }

    /* renew the value of input */
    renewInputValue = (bookId)=>{
      var item = this.state.bookOrder.items.find((elem)=>{
        return elem.bookId === bookId;
      })
      return typeof item !== 'undefined'? item.amount : 0;
    }
     
    /* submit the order and order items */
    subMitOrder = ()=>{
        axios.get("http://localhost:8081/order/orderNum").then((res)=>{
            var buyingList = this.state.bookOrder;
            if(buyingList.items.length===0){
              return ;
            }
            var date = new Date();
            buyingList.order_time = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+
                date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
            buyingList.order_id = parseInt(res.data);
            for(var i = 0;i<buyingList.items.length;i++){
              buyingList.items[i].order_id = buyingList.order_id;
              buyingList.items[i].book_id = buyingList.items[i].bookId;
              delete buyingList.items[i].bookId;
            }    
            axios.post("http://localhost:8081/order",buyingList
            )
            this.setState({
              bookOrder:{
                total:0,
                items:[]
              }
            })
        })  
        
        
    }

    /* get total price */
    sumPrice = ()=>{
      var result = 0;
      var buyingList = this.state.bookOrder.items;
      buyingList.forEach((elem)=>{
        result += elem.amount * 
        this.state.book.find((element)=>{
          return element.bookId === elem.bookId;
        }).price
      })
      return result;
    }

    /* get order items */
    getTargetBook = (bookId)=>{
      var targetBook = this.state.book.find((elem)=>{
        return elem.bookId === bookId;
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
                      <p>名称：{this.getTargetBook(item.bookId).title}</p>
                      <hr></hr>
                      <p>数量：{item.amount}</p>
                      <p>价格：{this.getTargetBook(item.bookId).price}</p>
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

