import React,{ Component } from 'react'
import { render } from "react-dom"
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './Smap.css'
import axios from 'axios';

export class Smap extends Component{
  constructor(props) {
    super(props);
    this.state = {
      my_lat: 1,my_lon: 1,Users:""
    };
    this.getCoords=this.getCoords.bind(this);
    this.getCoordinates=this.getCoordinates.bind(this);
    this.calcDistance=this.calcDistance.bind(this);
  }
  componentDidMount(){
    this.getCoords();
    axios.get(`http://127.0.0.1:8000/api/${localStorage.getItem('username')}/seeklist`,{
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })      
        .then(response => {
            this.setState({
                User:response,
            })
            console.log(this.state.User);
        })
        .catch(error => {
            console.log(error);
        })
        console.log(localStorage.getItem('aaa'))
        }
  getCoords = (e) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getCoordinates);
    }
  }
  getCoordinates=(position)=>{
    console.log(position);
    this.setState({
      my_lat:position.coords.latitude,
      my_lon:position.coords.longitude
    })
  }
  calcDistance=(lat1,lon1,lat2,lon2)=>{
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // in metres
    //console.log(d);
    return d;
  }
    render() {
        const containerStyle = {
            position: 'relative',  
            width: '100%',
            height: '100%'
        }
        const lat1=this.state.my_lat;
        const lon1=this.state.my_lon;
        const lat2=lat1+0.0001;
        const lon2=lon1-0.0007;
        const dist=this.calcDistance(lat1,lon1,lat2,lon2)
        return (
        <div className="Smap-cntr">
          <Map google={this.props.google}
          containerStyle={containerStyle}
          center={{
            lat: lat1,
            lng: lon1
          }}
          zoom={15}
          onClick={this.onMapClicked}className="Smap-map" >
            <Marker
                title={`distance is ${dist} meters`}
                name={'SOMA'}
                position={{lat:lat1,
                  lng: lon1}} />
            <Marker
                title={`distance is ${dist} meters`}
                name={'SOMA'}
                position={{lat:lat2,
                  lng:lon2}} />
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