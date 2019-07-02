import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
    Table, Input, Button, Icon,Layout,Collapse,List, DatePicker
  } from 'antd';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import Tagger from '../layout/footer';
import Navigation from '../layout/header';
import config from '../config/config'

const Panel = Collapse.Panel;  
const { Content} = Layout;
const { RangePicker } = DatePicker;

class Orders extends Component{
    constructor(props){
        super(props);
        this.state={
            userName:this.props.match.params.userName,
            orderMap:new Map(),
            book:[],
            searchText: '',
            orders:[],
            orderBook: [],
        }
    }
    componentWillMount = ()=>{
        axios.get(config.url+"/book/id").then(response=>{
            this.setState({
              book:response.data
            })
        })
        axios.get(config.url+"/order/"+ this.state.userName)
        .then((res)=>{
            var dat = res.data; 
            for(var i=0; i<dat.length;i++){
              dat[i].key=i;
            }
            var data = [];
            for (var m = 0; m< dat.length; m++) {
              for (var j =0; j< dat[m].items.length; j++) {
                var json = {};
                json.bookId = dat[m].items[j].orderItemKey.bookId;
                json.amount = dat[m].items[j].amount;
                data.push(json);
              }
            }
            var book = [];
            var bookData = [];
            for (var k = 0; k < data.length; k++) {
              
              if(book.indexOf(data[k].bookId) < 0) {
                  book.push(data[k].bookId);
              }
            }
            book.forEach((elem) => {
              var temp = data.filter((eleme) => {
                return eleme.bookId === elem;
              })
              var js = {};
              js.bookId = elem;
              js.amount = 0;
              temp.forEach((t) => {
                js.amount += t.amount;
              })
              bookData.push(js);
            })
            this.setState({
              orders: dat,
              orderBook: bookData
            })
        })         
    }

    /* get book */
    getTargetBook = (bookId)=>{
      var targetBook = this.state.book.find((elem)=>{
        return elem.bookId === bookId;
      })

      return targetBook;
    }

    /* antd functiond */
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => { this.searchInput = node; }}
              placeholder={`搜索`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              搜索
            </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              清空
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
    
    /* antd functiond */
    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }
    
    /* antd functiond */
    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    }

    getDate = (e) => {
        axios.get(config.url + "/order/part/"+this.state.userName+"?start=" + e[0].format("YYYY-MM-DD") 
            +"&end=" + e[1].format("YYYY-MM-DD"))
            .then((res) => {
                this.setState({
                    orders: res.data
                })
            })
    }

    render(){
        const orderCol = [
            {
            title: '订单号',
            dataIndex: 'order_id',
            key: 'orderId',
            width: '20%',
            ...this.getColumnSearchProps('order_id'),
          }, {
            title: '价格',
            dataIndex: 'total',
            key: 'total',
            width: '10%',
            ...this.getColumnSearchProps('total'),
          }, {
            title: '时间',
            dataIndex: 'order_time',
            key: 'date',
            width: '15%',
            ...this.getColumnSearchProps('order_time'),
          }, {
            title: '详情',
            dataIndex: 'items',
            key: 'detail',
            width: '40%',
            render: (text)=> (
                <div>
                
                <Collapse>
                    <Panel header="订单详情" key="1">
                        <List
                            bordered
                            dataSource={text}
                            renderItem={item => (
                            <List.Item> 
                            <p>   名称：{this.getTargetBook(item.orderItemKey.bookId).title} </p>
                            <hr></hr>
                            <p>   数量：{item.amount}</p>
                            <hr></hr>
                            <p>   价格：{this.getTargetBook(item.orderItemKey.bookId).price} </p>
                            </List.Item>)}
                        />
                    </Panel>
                </Collapse>
                </div> 
            )
        }]
        const dateFormat = 'YYYY-MM-DD';
        const bookCol = [
          {
            title: "书籍编号",
            dataIndex: "bookId",
            key: "0"
          },{
            title: "数量",
            dataIndex: "amount",
            key: "1"
          }
        ]
        return (
            <Layout>
            <Navigation userName={this.state.userName}></Navigation>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280,
                }}>
                <RangePicker
                    defaultValue={[moment('2019/07/01', dateFormat), moment('2019/07/01', dateFormat)]}
                    format={dateFormat}
                    onChange={this.getDate}
                />
                <Table rowKey="order_id" columns={orderCol} dataSource={this.state.orders} />
                <Table rowKey="bookId" columns={bookCol} dataSource={this.state.orderBook} />
                </Content>
            </Layout>
            <Tagger></Tagger>
            </Layout>
        );
    }
}

export default Orders;

