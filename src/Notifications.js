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
import axios from 'axios';
class Notifications extends Component {
    constructor(props){
        super(props);
        this.state = {
            provideReqs:[],seekReqs:[],othersReqs:[],clickedUser:[]
        }
        this.getProvideReqs=this.getProvideReqs.bind(this);
        this.getSeekReqs=this.getSeekReqs.bind(this);
        this.getothersReqs=this.getothersReqs.bind(this);
        this.showDetails=this.showDetails.bind(this);
    }
    componentDidMount(){
        this.getProvideReqs();
        this.getSeekReqs();
        this.getothersReqs();
    }
    getProvideReqs(){
        axios.get(`http://127.0.0.1:8000/notification/providereq/`,
                {
                  headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
    
        })
        .then(response => {
            this.setState({
                provideReqs:response.data.users,
            })
            console.log(this.state.provideReqs);
        })
        .catch( error =>{
            console.log(error);
        }
        )
    }
    getSeekReqs(){
        axios.get(`http://127.0.0.1:8000/notification/seekreq/`,
                {
                  headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
    
        })
        .then(response => {
            this.setState({
                seekReqs:response.data.users,
            })
            console.log(this.state.seekReqs);
        })
        .catch( error =>{
            console.log(error);
        }
        )
    }
    getothersReqs(){
        axios.get(`http://127.0.0.1:8000/notification/`,
                {
                  headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
    
        })
        .then(response => {
            this.setState({
                othersReqs:response.data.notifications,
            })
            console.log(response);
        })
        .catch( error =>{
            console.log(error);
        }
        )
    }
    showDetails(username){
        axios.get(`http://127.0.0.1:8000/api/${username}`,{
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })      
        .then(response => {
            this.setState({
                clickedUser:response.data,
            })
            console.log(this.state.clickedUser);
        })
        .catch(error => {
            console.log(error);
        })
    }
    render(){
        return(
            <div className="notification-prnt">
                <div className="notification-cntr">
                    <div className="notification-left">
                        <Navbar />
                    </div>
                    <div className="notification-center">
                        <h4>Your provide requests</h4>
                        <div>
                            {this.state.provideReqs.map(request => (
                                <div>
                                    <p>You have requested to help</p> <p value={request} className="req-name" onClick={() => this.showDetails(request)}> {request}</p>
                                </div>                            
                            ))}
                        </div>
                        <h4>Your seek requests</h4>
                        <div>
                            {this.state.seekReqs.map(request => (
                                <div>
                                    <p>You have requested to get help from</p> <p value={request} className="req-name" onClick={() => this.showDetails(request)}> {request}</p>
                                </div>
                            ))}
                        </div>
                        <h4>People who have requested from you</h4>
                        <div>
                            {this.state.othersReqs.map(request => (
                                <div>
                                    <p value={request} className="req-name" onClick={() => this.showDetails(request.text.split(" ")[0])}>{request.text}</p><p>{request.time}</p><br />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="notification-right">
                        <div>
                            <h4>Adress:<br /> {this.state.clickedUser.address}</h4>
                            <h4>blood group:<br /> {this.state.clickedUser.blood_group}</h4>
                            <h4>contact:<br /> {this.state.clickedUser.contact}</h4>
                            <h4>occupation:<br /> {this.state.clickedUser.occupation}</h4>
                            <h4>username:<br /> {this.state.clickedUser.username}</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Notifications;