import React,{ Component } from 'react';
import './Navbar.css';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {username:this.props.username,token:this.props.token}
        this.handleClick=this.handleClick.bind(this);
        this.handleLogout=this.handleLogout.bind(this);
    }
    componentDidMount(){
        this.setState({
            username:this.props.username,token:this.props.token
        })
    }
    handleClick(e){
        this.props.history.push(`/${e.target.value}/${localStorage.getItem('username')}/`);
    }
    handleLogout(){
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        this.props.history.push('/');
    }
    render(){ 
        return (
            <div className="Navbar-prnt">
                <div className="Navbar-cntr">
                            <button className="nav-button one" value="MyProfile" onClick={this.handleClick}>My Profile</button>
                            <button className="nav-button" value="Seek" onClick={this.handleClick}>Seek</button>
                            <button className="nav-button" value="Provide" onClick={this.handleClick}>Provide</button>
                            <button className="nav-button" value="Notifications" onClick={this.handleClick}>Notifications</button>
                            <button className="nav-button-logout" value="Logout" onClick={this.handleLogout}>Logout</button>
                </div>
            </div>
        );
    }
}
 
export default withRouter(Navbar);