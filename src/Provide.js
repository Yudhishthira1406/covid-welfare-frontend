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
import Pmap from './Pmap';
import axios from 'axios'
class Provide extends Component {
    constructor(props) {
        super(props);
        this.state = { User:[],provide:"",Seekers:[] }
        this.handleProvide=this.handleProvide.bind(this);
    }
    componentDidMount(){
        if(localStorage.getItem('username')===null){
            console.log("unauthenticated");
            this.props.history.push("/GetStarted");
        }
        else{
            axios.get(`http://127.0.0.1:8000/api/${localStorage.getItem('username')}`,{
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
            })      
            .then(response => {
            this.setState({
                User:response.data,
                provide:response.data.provide,
            })
            console.log(this.state.User);
            })
            .catch(error => {
            console.log(error);
            })
            axios.get(`http://127.0.0.1:8000/api/${localStorage.getItem('username')}/seeklist`,{
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
            })      
            .then(response => {
            this.setState({
                Seekers:response.data.data,
            })
            console.log(this.state.Seekers);
            })
            .catch(error => {
            console.log(error);
            })
        }
    }
    handleProvide(e){
        axios.post(`http://127.0.0.1:8000/api/${localStorage.getItem('username')}/`,{
            contact:  this.state.User.contact,
            occupation: this.state.User.occupation,
            address: this.state.User.address,
            lat: this.state.User.lat ,
            lon: this.state.User.lon ,
            blood_group: this.state.User.blood_group,
            provide: e.target.checked,
            username: localStorage.getItem('username'),
        },{
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            console.log(response);
            this.setState({
                provide:response.data.provide,
            })
        })
        .catch(error => {
            console.log(error);
        })
    }
    render(){ 
        return (
            <div className="Provide-prnt">
                <div className="Provide-cntr">
                    <div className="Provide-left">
                        <Navbar />
                    </div>
                    <div className="Provide-center">
                        <div className="Provide-input" >
                            <label>Provide</label>
                            <input type="checkbox" checked={this.state.provide} onClick={this.handleProvide} /> 
                        </div>
                        <div>
                            {this.state.Seekers.map(Seeker => (
                                <div>
                                    {Seeker.username}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="Provide-right">
                        <Pmap />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Provide;