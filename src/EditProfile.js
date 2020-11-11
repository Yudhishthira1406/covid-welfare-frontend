import React,{ Component } from 'react';
import './EditProfile.css';
import Navbar from './Navbar'
import { withRouter } from "react-router";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams
} from "react-router-dom";
import axios from 'axios';
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User:"",username:"",contactnum:"",bloodgroup:"",occupation:"",address:"",lat:"",lon:"",changelocation:false
        }
        this.handleAdChange=this.handleAdChange.bind(this);
        this.handleUsnmChange=this.handleUsnmChange.bind(this);
        this.handleOcChange=this.handleOcChange.bind(this);
        this.handleCnChange=this.handleCnChange.bind(this);
        this.handleBgChange=this.handleBgChange.bind(this);
        this.handlePrChange=this.handlePrChange.bind(this);
        this.getCoords=this.getCoords.bind(this);
        this.getCoordinates=this.getCoordinates.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.getCoords();
        axios.get(`http://127.0.0.1:8000/api/${localStorage.getItem('username')}`,{
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })      
        .then(response => {
            this.setState({
                User:response.data,
            })
        })
        .catch(error => {
            console.log(error);
        })
      }
      getCoords = (e) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates);
        }
      }
      getCoordinates=(position)=>{
        this.setState({
          lat:position.coords.latitude,
          lon:position.coords.longitude
        })
        console.log(this.state.lat,this.state.lon);
      }
    handleUsnmChange=(e)=>{
        this.setState({
                username:e.target.value
        });
    }
    handleCnChange=(e)=>{
        this.setState({
                contactnum:e.target.value
        });
    }
    handleBgChange=(e)=>{
        this.setState({
                bloodgroup:e.target.value
        });
    }  
    handleOcChange=(e)=>{
        this.setState({
                occupation:e.target.value
        });
    }
    handleAdChange=(e)=>{
        this.setState({
                address:e.target.value
        });
    }
    handlePrChange=(e)=>{
        this.setState({
            provide: e.target.checked,
        })
    }
    handleLcChange=(e)=>{
        this.setState({
            changelocation:e.target.checked,
            
        })
        console.log(e.target.checked);
    }
    handleSubmit(){
        axios.post(`http://127.0.0.1:8000/api/${localStorage.getItem('username')}/`,{
            contact:  (this.state.contactnum!="") ? this.state.contactnum : this.state.User.contact,
            occupation: (this.state.occupation!="") ? this.state.occupation :this.state.User.occupation,
            address: (this.state.address!="") ? this.state.address : this.state.User.address,
            lat: (this.state.changelocation)? this.state.lat:this.state.User.lat ,
            lon: (this.state.changelocation)? this.state.lon:this.state.User.lon ,
            blood_group: (this.state.bloodgroup!="") ? this.state.bloodgroup : this.state.User.blood_group,
            provide: this.state.provide,
            username: localStorage.getItem('username'),
        },{
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
        console.log("submit");
        this.props.history.push(`/MyProfile/${localStorage.getItem('username')}`)
    }
    render() {
        return (
            
            <div className="EditProfile-container">
                <form onSubmit={this.handleSubmit} className="EditProfile-form">
                    
                    <label>Contact number</label><br />
                    <input type="text" value={this.state.contactnum} onChange={this.handleCnChange}  required/><br />
                    <label>Blood Group</label><br />
                    <input type="text" value={this.state.bloodgroup} onChange={this.handleBgChange}  required/><br />
                    <label>Address</label><br />
                    <input type="text" value={this.state.address} onChange={this.handleAdChange}  required/><br />
                    <label>Occupation</label><br />
                    <input type="text" value={this.state.occupation} onChange={this.handleOcChange} required /><br />
                    <label>Set location to this location </label><br />
                    <input type="checkbox" checked={this.state.changelocation} onChange={this.handleLcChange} /><br /> 
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}
 
export default withRouter(EditProfile);