import React,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GetStarted from './GetStarted'
import IntroPage from './IntroPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <IntroPage />
            </Route>
          </Switch>
          <Switch>
            <Route exact path="/GetStarted">
              <GetStarted />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
 
export default App;
