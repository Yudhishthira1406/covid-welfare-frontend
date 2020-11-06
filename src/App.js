import React,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GetStarted from './GetStarted'
import IntroPage from './IntroPage'
import MyProfile from './MyProfile'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Navbar from './Navbar';
import Seek from './Seek'
import { Smap } from './Smap';
import Provide from './Provide';
import { UserProvider } from './UserContext';

class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {token:"",username:""}
    this.handleChange=this.handleChange.bind(this);
  }
  handleChange(token,username){
    this.setState({
      token:token,username:username,
    })
  }
  render() { 
    return ( 
      <div>
        <UserProvider value={this.state}>
        <Router>
          <Switch>
            <Route exact path="/">
              <IntroPage />
            </Route>          
            <Route exact path="/GetStarted" >
              <GetStarted token={this.state.token} username={this.state.username} handleChange={this.handleChange} />
            </Route>          
            <Route path="/MyProfile/:username/:token">
              <MyProfile token={this.state.token} username={this.state.username} />
            </Route>          
            <Route exact path="/Navbar/:username/:token">
              <Navbar token={this.state.token} username={this.state.username} />
            </Route>
            <Route exact path="/Seek/:username/:token">
              <Seek token={this.state.token} username={this.state.username} />
            </Route>
            <Route exact path="/Provide/:username/:token">
              <Provide token={this.state.token} username={this.state.username} />
            </Route>
            <Route exact path="/Smap/:username/:token">
              <Smap token={this.state.token} username={this.state.username} />
            </Route>
          </Switch>
        </Router>
        </UserProvider>
      </div>
    );
  }
}
 
export default App;
