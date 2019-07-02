import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Layout, Table, Input, Button, Icon, Modal } from 'antd';
import Highlighter from 'react-highlight-words';  
import axios from 'axios';
import {Link} from 'react-router-dom';
import Tagger from '../layout/footer';
import Navigation from '../layout/header';
import config from '../config/config';


const {Content} = Layout;

class MBookList extends Component{
    constructor(props){
        super(props);

        this.state={
            searchText: '',
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            /* user name */
            userName:this.props.match.params.userName, 
            /* get book data by axios */
            books:[],
            book: {
              "bookId": null,
              "title": "",
              "author": "",
              "isbn": "",
              "remaining": null,
              "price": null,
              "introduction": ""
            },
            visible: false,
            isModify: false,
        } 

    }

    componentDidMount() {
        axios.get(config.url + "/book/id")
        .then((res) => {
          this.setState({
            books: res.data
          });
        })
    }
    

    /* get order items */
    getTargetBook = (bookId)=>{
      var targetBook = this.state.books.find((elem)=>{
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

    /* antd functions */
    handleOk = e => {
        let books = this.state.books;
        
        
        axios.get(config.url + "/book/key").then((res) => {
          let book = this.state.book;
          book.bookId = res.data
          this.setState({
            book: book
          }, ()=>{
            books.push(this.state.book); 
            axios.post(config.url + "/book/id", this.state.book)
              .then(()=>{    
                this.setState({
                  visible: false,
                  books: books,
                  book: {
                    "bookId": null,
                    "title": "",
                    "author": "",
                    "isbn": "",
                    "remaining": null,
                    "price": null,
                    "introduction": ""
                  }
                });
              })
          })
        })
    };
 
    removeBook = () => {
      axios.post(config.url + "/book/remove", this.state.selectedRowKeys).then(
        ()=>{
          console.log(this.state.selectedRowKeys);
          axios.get(config.url + "/book/id").then((res) => {
            this.setState({
              books: res.data,
              selectedRowKeys: [],
            })
          })
        }
      )
    }

    render(){
        const loading = this.state.loading;

        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            onChange: selectedRowKeys => {
                this.setState({ selectedRowKeys });
            },
        };
        const hasSelected = selectedRowKeys.length > 0;
        const columns = [
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
            }
        ]
        return (
            <Layout>
            <Navigation userName={this.state.userName}/>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 450,
                }}>
                  <div>
                    <div style={{ marginBottom: 16 }}>
                        {/* 删除和增加的按钮 */}
                        <Button type="primary" onClick={this.removeBook} disabled={!hasSelected} loading={loading}>
                        删除
                        </Button>
                        <Button type="primary" 
                            onClick={() => {
                                this.setState({
                                    visible: true,
                                });
                            }} 
                            loading={loading}
                        >
                        增加
                        </Button>
                        <Button type="primary" 
                            onClick={() => {
                                this.setState({
                                    visible: true,
                                });
                            }} 
                            loading={loading}
                        >
                        修改
                        </Button>
                        {/* 弹出的表单 */}
                        <Modal title="新增输入框"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={() => {this.setState({ visible:false })}}
                        >
                            <Input placeholder="书名" 
                                value={this.state.book.title}
                                onChange= {(e) => {
                                  let book = this.state.book;
                                  book.title = e.target.value;
                                  this.setState({ book: book })
                              }}>
                            </Input>
                            <Input placeholder="作者" 
                                value={this.state.book.author}
                                onChange= {(e) => {
                                  let book = this.state.book;
                                  book.author = e.target.value;
                                  this.setState({ book: book })
                              }}>
                            </Input>
                            <Input placeholder="价格" 
                                value={this.state.book.price}
                                onChange= {(e) => {
                                  let book = this.state.book;
                                  book.price = parseInt(e.target.value);
                                  this.setState({ book: book })
                              }}>
                            </Input>
                            <Input placeholder="库存" 
                                value={this.state.book.remaining}
                                onChange= {(e) => {
                                  let book = this.state.book;
                                  book.remaining = parseInt(e.target.value);
                                  this.setState({ book: book })
                              }}>
                            </Input>
                            <Input placeholder="isbn" 
                                value={this.state.book.isbn}
                                onChange= {(e) => {
                                  let book = this.state.book;
                                  book.isbn = e.target.value;
                                  this.setState({ book: book })
                              }}>
                            </Input>
                            <Input placeholder="短评" 
                                value={this.state.book.introduction}
                                onChange= {(e) => {
                                  let book = this.state.book;
                                  book.introduction = e.target.value;
                                  this.setState({ book: book })
                              }}>
                            </Input>
                        </Modal>
                    </div>
                    {/* 数据展示表格 */}
                    <Table rowKey="bookId" rowSelection={rowSelection} columns={columns} dataSource={this.state.books} />
                </div>
              </Content>
            </Layout>
            <Tagger />
            </Layout>
        );
    }
}

export default MBookList;