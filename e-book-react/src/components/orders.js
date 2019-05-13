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
            userName:this.props.match.params.userName||"user",
            orderMap:new Map(),
            details:[],
            searchText: '',
            orders:[],
            orderCol:[
                {
                title: '订单号',
                dataIndex: 'orderId',
                key: 'orderId',
                width: '20%',
                ...this.getColumnSearchProps('orderId'),
              }, {
                title: '价格',
                dataIndex: 'total',
                key: 'total',
                width: '10%',
                ...this.getColumnSearchProps('total'),
              }, {
                title: '时间',
                dataIndex: 'date',
                key: 'date',
                width: '15%',
                ...this.getColumnSearchProps('date'),
              }, {
                title: '详情',
                dataIndex: 'orderId',
                key: 'detail',
                width: '40%',
                render: (text)=> (
                    <div>
                    <Collapse onChange={console.log(2)}>
                        <Panel header="订单详情" key="1">
                            <List
                                bordered
                                dataSource={this.state.orderMap[text]}
                                renderItem={item => (
                                <List.Item> 
                                <p>   名称：{this.state.details[item.detailId].title}</p>
                                <hr></hr>
                                <p>   数量：{item.bookNumber}</p>
                                <hr></hr>
                                <p>   价格：{this.state.details[item.detailId].price}</p>
                                </List.Item>)}
                            />
                        </Panel>
                    </Collapse>
                    </div> 
                )
              }]
        }
    }
    componentDidMount = ()=>{
        axios.get("http://localhost:8080/detail/id").then(response=>{
            var dat = response.data;
            for(var i=0; i<dat.length;i++){
              dat[i].key=i;
            }
            this.setState({
              details:dat
            })
            getOrder()
        })
        var getOrder = ()=>{
            axios.get("http://localhost:8080/order/"+this.state.userName)
            .then((res)=>{
                this.setState({
                    orderMap:res.data
                })
                
                var orders = [];
                var orderMap = this.state.orderMap;
                var sumPrice = (values)=>{
                    var details = this.state.details;
                    var result = 0;
                    for(var i = 0;i<values.length;i++){
                        result += details[values[i].detailId].price * values[i].bookNumber;
                    }
                    return result;
                }
                
                for(var key in orderMap){
                    var order = {};
                    var values = orderMap[key];
                    order["key"] = key;
                    order["orderId"] = key;
                    order["total"] = sumPrice(values);
                    order["date"] = values[0].orderId.slice(values[0].orderId.length-15,values[0].orderId.length);
                    var detailList = [];
                    for(var i = 0; i<values.length;i++){
                        var value = values[i];
                        detailList.push({
                            detailId: value.detailId,
                            detailName : this.state.details[value.detailId].title,
                            bookNumber: value.bookNumber
                        })
                    }
                    order["detail"] = detailList
                    orders.push(order);
                    
                };
                this.setState({
                    orders:orders
                })   
            })
        }
        
    }

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
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
      }
    
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

