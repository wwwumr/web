import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import HomePage from './components/homePage'
import LogIn from './components/logIn'
import Details from './components/details'
import BookList from './components/bookList'
import Orders from './components/orders'
import Analize from './components/analize'


class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/bookList/:userName" component={BookList}/>
            <Route exact path="/logIn/" component={LogIn}/>
            <Route exact path="/details/:id" component={Details}/>
            <Route exact path="/orders/:userName" component={Orders}/>
            <Route exact path="/analize/:userName" component={Analize}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
