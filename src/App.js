import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './Home';
import Messages from './Messages';
import Login from './Login';
import Explore from './Explore';
import firebase from "./firebase";
import React from 'react';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:"loading"
    };
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user: user });
    });
  }


  render(){
    return <Router>
      <Switch>
      <Route path="/messages">
            <Messages/>
          </Route>
      <Route path="/explore">
            <Explore/>
          </Route>
      <Route path="/">
        {(this.state.user=="loading")?<div></div> :((this.state.user) ?
        (<Home firebase={firebase}/>):<Login firebase={firebase}/>)}
          </Route>
      </Switch>
    </Router>
  }
}

export default App;
