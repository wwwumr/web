import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu, Table, Input, Button, Icon } from 'antd';
import {Link} from 'react-router-dom';
import Highlighter from 'react-highlight-words';  

const { Header, Content, Footer} = Layout;

class BookList extends Component{
    constructor(props){
        super(props);
        this.state={
            searchText: '',
            userName:"user",    
            book:[{
                title: '绝世唐门',
                author:"唐家三少",
                image:"/img/jueShiTangMen.jpg",
                ISBN:"01",
                remaining:"10"
              },{
                title: '全职高手',
                author:"蝴蝶蓝",
                image:"/img/quanZhiGaoShou.jpg",
                ISBN:"02",
                remaining:"10"
              },{
                title: '三寸天堂',
                author:"耳根",
                image:"/img/sanCunTianTang.jpg",
                ISBN:"03",
                remaining:"10"
              },{
                title: '镇魂',
                author:"priest",
                image:"/img/zhenHun.jpg",
                ISBN:"04",
                remaining:"10"
              }
            ],
            tag:[{
                    title: '图片',
                    dataIndex: 'image',
                    key: 'image',
                    render: (text) => <Link to="/details/id"><img src={process.env.PUBLIC_URL+text} style={{maxWidth:'120px'}} alt="" /></Link>,
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
                    dataIndex: 'ISBN',
                    key: 'ISBN',
                  },{
                    title: '库存',
                    dataIndex: 'remaining',
                    key: 'remaining',
                  }
            ]
        }
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => { this.searchInput = node; }}
              placeholder={`Search ${dataIndex}`}
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
              Search
            </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
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
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} >
                <Menu.Item key="0"><Link to="/">{ this.state.userName }</Link></Menu.Item>
                <Menu.Item key="1"><Link to="/logIn">用户注册</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/bookList">图书列表</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/orders">历史订单</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/analize">统计信息</Link></Menu.Item>
                </Menu>
            </Header>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 450,
                }}>
                <Table columns={this.state.tag} dataSource={this.state.book} />
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>
            E-BOOK ©2019 Created by Wang Xiaoran
            </Footer>
            </Layout>
            
        );
    }
}

export default BookList;

