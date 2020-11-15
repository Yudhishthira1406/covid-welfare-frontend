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
import Smap from './Smap';
import axios from 'axios'
import Seek from './Seek';
class Provide extends Component {
    constructor(props) {
        super(props);
        this.state = { User:[],provide:"",Seekers:[],userClicked:[],dist:"",seektext:""}
        this.handleProvide=this.handleProvide.bind(this);
        this.handleMarkerClick=this.handleMarkerClick.bind(this);
        this.handleCloseButton=this.handleCloseButton.bind(this);
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
            axios.get(`http://127.0.0.1:8000/api/${localStorage.getItem('username')}/providelist`,{
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
            })      
            .then(response => {
            this.setState({
                Seekers:response.data.data,
            })
            console.log("hi");
            console.log(this.state.Seekers);
            })
            .catch(error => {
            console.log(error);
            })
        }
    }
    handleMarkerClick = (username,dist)=>{
        // alert("Marker Clicked" + username);
        this.setState({
          dist:dist,
        })
        axios.get(`http://127.0.0.1:8000/api/${username}/`,{
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
          })      
          .then(response => {
              this.setState({
                  // Users:response.data.data,
                  userClicked: response.data,
                  
              })
              console.log(this.state.userClicked);
          })
          .catch(error => {
              console.log(error);
          })
          axios.get(`http://127.0.0.1:8000/api/${username}/seek/`,{
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
          })      
          .then(response => {
              this.setState({
                  // Users:response.data.data,
                  seektext:response.data.seek_text,
                  
              })
              console.log(response);
          })
          .catch(error => {
              console.log(error);
          })
          document.getElementsByClassName('invisible')[0].style.zIndex = "1";
      }
      handleCloseButton = ()=>{
        this.setState({
          userclicked: {},
        })
        document.getElementsByClassName('invisible')[0].style.zIndex = "-1";
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
                            <h2>People in need</h2>
                            <div className="seekList">
                            {this.state.Seekers.map(Seeker => (
                                <div className="seekers" onClick={() => this.handleMarkerClick(Seeker.username,Seeker.dist)}>
                                    <strong>Name: </strong>{Seeker.username}<br />
                                    <strong>Distance: </strong>{Seeker.dist.toFixed(4)} Kms<br /><br />
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                    <div className="Provide-right">
                        <Pmap type={"provide"} handleCloseButton={this.handleCloseButton} handleMarkerClick={this.handleMarkerClick} userClicked={this.state.userClicked} dist={this.state.dist} seektext={this.state.seektext} />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Provide;