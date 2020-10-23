import React, { Component } from 'react';
import './IntroPage.css';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import  { Redirect } from 'react-router-dom';
// import {Link} from 'react-router-dom';

const CLIENT_ID = '641145669737-r3r370rcf0o8tg0el2ip8tohq7lo559v.apps.googleusercontent.com';
class GoogleBtn extends Component {
   constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: ''
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login (response) {
    if(response.accessToken){
      this.setState(state => ({
        isLogined: true,
        accessToken: response.accessToken
      }));
    }
  }

  logout (response) {
    this.setState({
      isLogined: false,
      accessToken: ''
    });
  }

  handleLoginFailure (response) {
    alert('Failed to log in')
  }

  handleLogoutFailure (response) {
    alert('Failed to log out')
  }

  render() {
    return (
    <div>
      { this.state.isLogined ?
        <Redirect to="/MyProfile" className="leftButton">Login Successful</Redirect>
        : <GoogleLogin
          clientId={ CLIENT_ID }
          buttonText='Login with Google'
          onSuccess={ this.login }
          onFailure={ this.handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
        />
      }
      {/* { this.state.accessToken ? <Link to="/GetStarted" className="leftButton">Login Successful</Link> : null } */}

    </div>
    )
  }
}

export default GoogleBtn; 
// https://console.developers.google.com/apis/credentials/oauthclient/${84423384209-rs1i388knebh880b59vhb4mmk4ia5j46}?project=${covid-helper-290616}
// api key= AIzaSyBXNlWEKkk2l9Yalt5F0Do4hVcMTYWePGE
// clientid= 641145669737-r3r370rcf0o8tg0el2ip8tohq7lo559v.apps.googleusercontent.com
// client secret= 3BKKp8Bz9Mhse1R-AAA5AC1M