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
import  './Notifications.css'
class Notifications extends Component {
    render(){
        return(
            <div>
                <div className="notify-left">
                    <Navbar />
                </div>
            </div>
        )
    }
}

export default Notifications;