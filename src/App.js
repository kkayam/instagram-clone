import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from './Home';
import Messages from './Messages';
import Login from './Login';
import Explore from './Explore';
import Signup from './Signup';
import Profile from './Profile';
import firebase from "./firebase";
import React from 'react';


class App extends React.Component {
  constructor(props){
    super(props);
    var users_db = firebase.firestore().collection('users');
    this.state = {
      user:"loading"
    };
    firebase.auth().onAuthStateChanged((user) => {
      users_db.doc(user.uid).get().then((doc) => {
        var data = doc.data();
        data["uid"] = user.uid;
        this.setState({
          user: data
        })
      })
    });    
  }

  checkLogin(destination){
    return (this.state.user==="loading")?<div></div> :((this.state.user) ?
        (destination):<Redirect to="/" />);
  }


  render(){
    return <Router>
      <Switch>
      <Route exact path="/messages">
            {this.checkLogin(<Messages firebase={firebase} user={this.state.user}/>)}
          </Route>
      <Route exact path="/explore">
            {this.checkLogin(<Explore firebase={firebase} user={this.state.user}/>)}
          </Route>
      <Route exact path="/signup">
            <Signup firebase={firebase} />
          </Route>
      <Route exact path="/">
        {(this.state.user==="loading")?<div></div> :((this.state.user) ?
        (<Home firebase={firebase} user={this.state.user}/>):<Login firebase={firebase}/>)}
          </Route>
      <Route path="/">
        {this.checkLogin(<Profile user={this.state.user} firebase={firebase}/>)}
      </Route>
      </Switch>
    </Router>
  }
}

export default App;
