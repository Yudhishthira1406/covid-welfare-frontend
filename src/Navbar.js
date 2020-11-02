import React,{ Component } from 'react';
import './Navbar.css';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Link,
  Redirect
} from "react-router-dom";
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render(){ 
        return (
            <div className="Navbar-prnt">
                <div className="Navbar-cntr">
                        <Link to="/MyProfile" className="link one">
                            <button className="nav-button">My Profile</button>
                        </Link>
                        <Link to="/Seek" className="link">
                            <button className="nav-button">Seek</button>
                        </Link>
                        <Link to="/Provide" className="link">
                            <button className="nav-button">Provide</button>
                        </Link>
                        <Link to="/Notifications" className="link">
                            <button className="nav-button">Notifications</button>
                        </Link>
                </div>
            </div>
        );
    }
}
 
export default Navbar;