import React,{ Component } from 'react';
import './Provide.css';
import Navbar from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

class Notifications extends Component {
    render(){
        return(
            <div>
                <Navbar />
            </div>
        )
    }
}

export default Notifications;