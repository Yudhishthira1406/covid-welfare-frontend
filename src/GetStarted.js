import React,{ Component } from 'react'
import './GetStarted.css'
import GoogleBtn from './GoogleBtn.js'
import axios from 'axios'
import UserContext from './UserContext'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";
import { Userconsumer } from './UserContext';
class GetStarted extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            User:{
                userName:"",emailId:"",password:"",password2:""
            },
            Username:"",pass:""
        }
        //this.handleSubmit=this.handleSubmit.bind(this);
        this.handleSignUp=this.handleSignUp.bind(this);
        this.handleUsnmChange=this.handleUsnmChange.bind(this);
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
        this.handlePassword2Change=this.handlePassword2Change.bind(this);
        this.handleLoginchange=this.handleLoginchange.bind(this);
        this.handleLoginpass=this.handleLoginpass.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }
    handleLoginchange(e){
        this.setState({
            Username:e.target.value,
        });
    }
    handleLoginpass(e){
        this.setState({
            pass:e.target.value,
        })
    }
    handleUsnmChange=(e)=>{
        this.setState({
            User:{
                ...this.state.User,
                userName:e.target.value
            }
        });
    }
    handleEmailChange=(e)=>{
        this.setState({
            User:{
                ...this.state.User,
                emailId:e.target.value
            }
        });
    }
    handlePasswordChange=(e)=>{
        this.setState({
            User:{
                ...this.state.User,
                password:e.target.value
            }
        });
    }
    handlePassword2Change=(e)=>{
        this.setState({
            User:{
                ...this.state.User,
                password2:e.target.value
            }
        });
    }
    handleSignUp(){
        console.log(this.state.User);
        if(this.state.User.userName!="" && this.state.User.emailId!="" && this.state.User.password!="" && this.state.User.password2!=""){
            if(this.state.User.password===this.state.User.password2){
                axios.post('http://127.0.0.1:8000/api/user/register/',{
                username: this.state.User.userName,
                email: this.state.User.emailId,
                password: this.state.User.password,
                password2: this.state.User.password2,
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
                this.mainInput.value="";
                alert("Registration completd please log in now");
            }
            else{
                alert("Passwords do not match");
            }            
        }
        
    }
    handleLogin(){
        axios.post('http://127.0.0.1:8000/api/user/login/',{
            username: this.state.Username,
            password: this.state.pass
        })
        .then(response => {
            console.log(response);
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('username',this.state.Username);
            this.props.history.push(`/MyProfile/${localStorage.getItem('username')}`);
        })
        .catch(error=>{
            console.log(error);
        })
        
        
    }
    render() { 
        return (
            <div>
                <div className="container">
                    <div className="signup">
                        <h1>JOIN US</h1>
                        <form onSubmit={this.handleSignUp}>
                            <label>Username</label><br />
                            <input className="inputs" ref={(ref) => this.mainInput= ref} type="text" value={this.state.User.userName} onChange={this.handleUsnmChange} required/><br />
                            <label>Email id</label><br />
                            <input className="inputs" ref={(ref) => this.mainInput= ref} type="text" value={this.state.User.emailId} onChange={this.handleEmailChange} required/><br />
                            <label>Password</label><br />
                            <input className="inputs" ref={(ref) => this.mainInput= ref} type="password" value={this.state.User.password} onChange={this.handlePasswordChange} required/><br />
                            <label>Confirm password</label><br />
                            <input className="inputs" ref={(ref) => this.mainInput= ref} type="password" value={this.state.User.password2} onChange={this.handlePassword2Change} required/><br />
                        </form>
                        <button onClick={this.handleSignUp} className="b1">SIGN UP</button>
                    </div>
                    <div className="login">
                        <h1>LOG IN</h1>
                        <form>
                            <label>Username</label><br />
                            <input className="inputs" type="text" value={this.state.Username} onChange={this.handleLoginchange} /><br />
                            <label>Password</label><br />
                            <input className="inputs" type="password" value={this.state.pass} onChange={this.handleLoginpass} /><br />
                        </form>
                        <button onClick={this.handleLogin} className="b3">LOG IN</button>
                        
                    </div>
                </div>
            </div>
        );
    }
}
 
export default withRouter(GetStarted);