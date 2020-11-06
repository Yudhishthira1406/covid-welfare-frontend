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
            User:"",username:"",contactnum:"",bloodgroup:"",occupation:"",address:"",lat:"",lon:"",provide:""
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
        console.log(position);
        this.setState({
          lat:position.coords.latitude,
          lon:position.coords.longitude
        })
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
    handleSubmit(){
        axios.post(`http://127.0.0.1:8000/api/${localStorage.getItem('username')}/`,{
            contact:  (this.state.contactnum!="") ? this.state.contactnum : this.state.User.contact,
            occupation: (this.state.occupation!="") ? this.state.occupation :this.state.User.occupation,
            address: (this.state.address!="") ? this.state.address : this.state.User.address,
            lat: (this.state.lat!="") ? this.state.lat : this.state.Users.lat,
            lon: (this.state.lon!="") ? this.state.lon : this.state.Users.lon,
            blood_group: (this.state.bloodgroup!="") ? this.state.bloodgroup : this.state.User.blood_group,
            provide: this.state.provide,
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
                    <input type="text" value={this.state.contactnum} onChange={this.handleCnChange} /><br />
                    <label>Blood Group</label><br />
                    <input type="text" value={this.state.bloodgroup} onChange={this.handleBgChange} /><br />
                    <label>Address</label><br />
                    <input type="text" value={this.state.address} onChange={this.handleAdChange} /><br />
                    <label>Occupation</label><br />
                    <input type="text" value={this.state.occupation} onChange={this.handleOcChange} /><br />
                    <label>Provide</label><br />
                    <input type="checkbox" checked={this.state.provide} onChange={this.handlePrChange} /><br />
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}
 
export default withRouter(EditProfile);