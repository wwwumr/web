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

class MOrders extends Component{
    constructor(props){
        super(props);
        this.state={
            userName:this.props.match.params.userName,
            orderMap:new Map(),
            book: [],
            searchText: '',
            orders: [],
            userTotal: [],
            bookTotal: [],
        }
    }
    componentWillMount = ()=>{
        axios.get(config.url+"/book/id").then(response=>{
            this.setState({
              book:response.data
            })
        })
        axios.get(config.url+"/order/id")
        .then((res)=>{
            var dat = res.data; 
            for(var i=0; i<dat.length;i++){
              dat[i].key=i;
            }
            //userTotal
            var userTotal = [];
            var users = [];
            for (var j = 0; j < dat.length; j++) {
                if(users.indexOf(dat[j].user_name) < 0) {
                    users.push(dat[j].user_name);
                }
            }
            users.forEach((eleme) => {
                var data = dat.filter((elem) => {
                    return elem.user_name === eleme;
                })
                var d={};
                d.user_name = eleme;
                d.total = 0;
                data.forEach((e) => {
                    d.total += e.total;
                })
                
                userTotal.push(d);
            })
            /*bookTotal
            var bookTotal = [];
            var books = [];
            for (var k = 0; k < dat.length; k++) {
                var orderData = dat[k].items;
                for(var m = 0 ; m < orderData.length; m++) {
                    if(books.indexOf(orderData[m].orderItemKey.bookId) < 0) {
                        books.push(orderData[m].orderItemKey.bookId);
                    }
                }
                
            }
            books.forEach((eleme) => {
                var data = dat.filter((elem) => {
                    var orderData = elem.items;
                    for(var n= 0 ; n < orderData.length; n++) {
                        if(elem.items[n].orderItemKey.bookId === eleme) {
                            var sd = {};
                            sd.bookId = eleme;
                            sd.amount = elem.items[n].amount;
                            return sd;
                        }
                    }
                })
                console.log(data);
                var d={};
                d.bookId = eleme;
                d.total = 0;
                data.forEach((e) => {
                    d.total += e.items.amount;
                })
                bookTotal.push(d);
            })*/
            this.setState({
              orders: dat,
              userTotal: userTotal,
              
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
        axios.get(config.url + "/order/part?start=" + e[0].format("YYYY-MM-DD") 
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
        const userCol = [
            {
                title: "用户名",
                dataIndex: "user_name",
                key: "0"
            },{
                title: "消费",
                dataIndex: "total",
                key: "1"
            }
        ];
        /*const bookCol = [
            {
                title: "书编号",
                dataIndex: "bookId",
                key: "0"
            },{
                title: "数量",
                dataIndex: "total",
                key: "1"
            }
        ];*/
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
                <Table rowKey="user_name" columns={userCol} dataSource={this.state.userTotal} />
                {/*<Table rowKey="bookId" columns={bookCol} dataSource={this.state.bookTotal} />*/}
                </Content>
            </Layout>
            <Tagger></Tagger>
            </Layout>
        );
    }
}

export default MOrders;

