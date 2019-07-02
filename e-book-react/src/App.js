import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import HomePage from './components/homePage'
import LogIn from './components/logIn'
import Details from './components/user/details'
import BookList from './components/user/bookList'
import Orders from './components/user/orders'
import UserManage from './components/admin/userManage'
import MBookList from './components/admin/mBookList';
import MOrders from './components/admin/mOrders'
import UpFile from './components/file'


class App extends Component {
  render() {
    return (
      <HashRouter>     
        <Switch>

            {/* Home Page and Login Page */}
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/logIn/" component={LogIn}/>
            <Route exact path="/file" component={UpFile} />

            {/* Normal User Pages */}
            <Route exact path="/bookList/:userName" component={BookList}/>
            <Route exact path="/details/:id/:userName" component={Details}/>
            <Route exact path="/orders/:userName" component={Orders}/>

            {/* ADMIN User Pages */}
            <Route exact path="/userManage/:userName" component={UserManage}/>
            <Route exact path="/mBookList/:userName" component={MBookList}/>
            <Route exact path="/mOrders/:userName" component={MOrders}/>
            
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
