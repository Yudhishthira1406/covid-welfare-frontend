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
    this.state = {token:"",userName:""}
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
              <GetStarted />
            </Route>          
            <Route path="/MyProfile">
              <MyProfile />
            </Route>          
            <Route exact path="/Navbar">
              <Navbar />
            </Route>
            <Route exact path="/Seek">
              <Seek />
            </Route>
            <Route exact path="/Provide">
              <Provide />
            </Route>
            <Route exact path="/Smap">
              <Smap />
            </Route>
          </Switch>
        </Router>
        </UserProvider>
      </div>
    );
  }
}
 
export default App;
