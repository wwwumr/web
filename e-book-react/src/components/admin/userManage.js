import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import '../../asset/css/logIn.css'
import Tagger from '../layout/footer';
import Navigation from '../layout/header';
import config from '../config/config'

const { Content} = Layout;

class UserManage extends Component{

    constructor(props){
        super(props);
        this.state={
            searchText: '',
            userData: [],
        }
    }

    componentDidMount() {
        axios.get(config.url + "/user/id").then((res) => {
            this.setState({
                userData: res.data
            })
        })
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
            <Input
            ref={node => {
                this.searchInput = node;
            }}
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
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
            </Button>
        </div>
        ),
        filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
        record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
        if (visible) {
            setTimeout(() => this.searchInput.select());
        }
        },
        render: text => (
        <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
        />
        ),
    });
    
    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    changeBanStatus = (e) => {
        var id = parseInt(e.target.id);
        var userData = this.state.userData;
        userData = userData.map((element)=>{
            if (element.userId === id) {
                element.ban = element.ban === null ? "2019-07-03 16:56:36" : null;    
            }
            return element;
        });
        
        this.setState({
            userData: userData
        })

        axios.post(config.url + "/user/change", [id]);
    }

    render(){
        const columns = [
            {
              title: '用户id',
              dataIndex: 'userId',
              key: '0',
              width: '20%',
              ...this.getColumnSearchProps('userId'),
            },{
              title: '用户名',
              dataIndex: 'name',
              key: '1',
              width: '20%',
              ...this.getColumnSearchProps('name'),
            },{
                title: '封禁状态',
                dataIndex: 'ban',
                key: '2',
                render: text => (<p>{text !==null ? '封禁' : '未禁'}</p>),
            },{
                title: '封禁/解禁',
                dataIndex: 'userId',
                key: '3',
                render: t => <Button id={t} onClick={ this.changeBanStatus } />,
            }
        ];
        return (
            <Layout>
            <Navigation userName={this.props.match.params.userName}></Navigation>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280,
                }}>
                <Table rowKey="userId" columns={columns} dataSource={this.state.userData}  />
                </Content>
            </Layout>
            <Tagger></Tagger>
            </Layout>
        );
    }
}

export default UserManage;