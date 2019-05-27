import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
    Table, Input, Button, Icon,Layout,Collapse,List
  } from 'antd';
import Highlighter from 'react-highlight-words';
import Tagger from './footer';
import Navigation from './header';
import axios from 'axios';

const Panel = Collapse.Panel;  
const { Content} = Layout;

class Orders extends Component{
    constructor(props){
        super(props);
        this.state={
            userName:this.props.match.params.userName,
            orderMap:new Map(),
            book:[],
            searchText: '',
            orders:[],
            orderCol:[
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
        }
    }
    componentWillMount = ()=>{
        axios.get("http://localhost:8081/book/id").then(response=>{
            this.setState({
              book:response.data
            })
        })
        axios.get("http://localhost:8081/order/"+this.state.userName)
        .then((res)=>{
            var dat = res.data; 
            for(var i=0; i<dat.length;i++){
              dat[i].key=i;
            }
            this.setState({
              orders:dat
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

    render(){
        return (
            <Layout>
            <Navigation userName={this.state.userName}></Navigation>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280,
                }}>
                <Table columns={this.state.orderCol} dataSource={this.state.orders} />
                </Content>
            </Layout>
            <Tagger></Tagger>
            </Layout>
            
        );
    }
}

export default Orders;

