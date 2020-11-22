import React,{ Component } from 'react'
import { render } from "react-dom"
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './Pmap.css'
import axios from 'axios';

export class Pmap extends Component{
  constructor(props) {
    super(props);
    this.state = {
      mylat: 1,mylon: 1,Users:[]
    };
    this.showMyLocation=this.showMyLocation.bind(this);
    this.showSeekers=this.showSeekers.bind(this);
    this.handleRequestButton = this.handleRequestButton.bind(this);
  }
  componentDidMount(){
    // this.getCoords();
        this.showMyLocation();
  }
  showMyLocation(){
    axios.get(`http://127.0.0.1:8000/api/${localStorage.getItem('username')}/`,{
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })      
        .then(response => {
            this.setState({
                // Users:response.data.data,
                mylat: response.data.lat,
                mylon: response.data.lon,
            })
            console.log(this.state.mylat + " " + this.state.mylon);
            this.showSeekers();
        })
        .catch(error => {
            console.log(error);
        })
  }
  showSeekers(){
    axios.get(`http://127.0.0.1:8000/api/${localStorage.getItem('username')}/${this.props.type}list`,{
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })      
        .then(response => {
            this.setState({
                Users:response.data.data,
            })
            console.log(this.state.Users);
        })
        .catch(error => {
            console.log(error);
        })
  }
  handleRequestButton = ()=>{
    axios.post(`http://127.0.0.1:8000/notification/providereq/`,
            {
              user: this.props.userClicked.username,
            },
            {
              headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            },

    })
    alert("Request Succesfully SENT....");
    document.getElementsByClassName('invisible')[0].style.zIndex = "-1";
  }
  render(){
      const containerStyle = {
          position: 'relative',  
          width: '100%',
          height: '100%',
      }
      const lat1=this.state.mylat;
      const lon1=this.state.mylon;
      
      return (
      <div className="Pmap-cntr">
        <h1 className="invisible">
          <div className="MyProfile-details">
            <p className="attribute-para-map"><span className="profile-atrribute-map">Name:  </span><br/>{this.props.userClicked.username}</p>
            <p className="attribute-para-map"><span className="profile-atrribute-map">Contact:  </span><br/>{this.props.userClicked.contact}</p>
            <p className="attribute-para-map"><span className="profile-atrribute-map">Distance from you:  </span><br/>{this.props.dist} Kms</p>
            <p className="attribute-para-map"><span className="profile-atrribute-map">Blood Group:  </span><br/>{this.props.userClicked.blood_group}</p>
            <p className="attribute-para-map"><span className="profile-atrribute-map">Address:  </span><br/>{this.props.userClicked.address}</p>
            <p className="attribute-para-map"><span className="profile-atrribute-map">Occupation:  </span><br/>{this.props.userClicked.occupation}</p>
            <p className="attribute-para-map"><span className="profile-atrribute-map">In need of:  </span><br/>{this.props.seektext}</p>

            <button onClick={this.props.handleRequestButton}>Request</button>
          </div>
        </h1>
        <Map google={this.props.google}
        containerStyle={containerStyle}
        center={{
          lat: lat1,
          lng: lon1
        }}
        zoom={15}
        //zoomControl={false}
        //gestureHandling= "none"
        onClick={this.onMapClicked}className="Pmap-map" >
          <Marker
              title={localStorage.getItem('username')}
              name={'SOMA'}
              position={{lat:lat1,
                lng: lon1}} 
                icon={{
                  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png",
                  scaledSize: new this.props.google.maps.Size(35,50),
                }} /> 
          {this.state.Users.map(User => (
            <Marker
            onClick={()=>{
              this.props.requestSeekerDetails(User.username,User.dist);
            }}
            title={`${User.username} | ${User.dist} Kms `}
            name={User.username}
            position={{lat:User.lat,
              lng: User.lon}} />
          ))}
          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h1></h1>
              </div>
          </InfoWindow>
        </Map>
        
      </div>
      );
    }
  }

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBXNlWEKkk2l9Yalt5F0Do4hVcMTYWePGE")
})(Pmap)