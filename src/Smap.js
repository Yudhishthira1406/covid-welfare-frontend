import React,{ Component } from 'react'
import { render } from "react-dom"
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './Smap.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export class Smap extends Component{
  constructor(props) {
    super(props);
    this.state = {
      mylat: 1,mylon: 1,Users:[],userClicked:{},dist:""
    };
    this.handleMarkerClick=this.handleMarkerClick.bind(this);
  }
  componentDidMount(){
    // this.getCoords();
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
        })
        .catch(error => {
            console.log(error);
        })
        
  }

  // calcDistance=(lat1,lon1,lat2,lon2)=>{
  //   const R = 6371; // metres
  //   const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  //   const φ2 = lat2 * Math.PI/180;
  //   const Δφ = (lat2-lat1) * Math.PI/180;
  //   const Δλ = (lon2-lon1) * Math.PI/180;
  //   const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
  //     Math.cos(φ1) * Math.cos(φ2) *
  //     Math.sin(Δλ/2) * Math.sin(Δλ/2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  //   const d = R * c; // in metres
  //   //console.log(d);
  //   return d/1000;
  // }

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
      document.getElementsByClassName('invisible')[0].style.zIndex = "1";
  }

  handleCloseButton = ()=>{
    this.setState({
      userclicked: {},
    })
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
      <div className="Smap-cntr">
        <h1 className="invisible">
          <div className="MyProfile-details">
            <p className="attribute-para-map"><span className="profile-atrribute-map">Name:  </span><br/>{this.state.userClicked.username}</p>
            <p className="attribute-para-map"><span className="profile-atrribute-map">Contact:  </span><br/>{this.state.userClicked.contact}</p>
            <p className="attribute-para-map"><span className="profile-atrribute-map">Blood Group:  </span><br/>{this.state.userClicked.blood_group}</p>
            <p className="attribute-para-map"><span className="profile-atrribute-map">Address:  </span><br/>{this.state.userClicked.address}</p>
            <p className="attribute-para-map"><span className="profile-atrribute-map">Occupation:  </span><br/>{this.state.userClicked.occupation}</p>
            <p className="attribute-para-map"><span className="profile-atrribute-map">Distance form you:  </span><br/>{this.state.dist}</p>
            <button onClick={this.handleCloseButton}>CLOSE</button>
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
        onClick={this.onMapClicked}className="Smap-map" >
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
              this.handleMarkerClick(User.username,User.dist);
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
})(Smap)