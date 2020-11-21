import React,{ Component } from 'react';
import './Seek.css';
import Navbar from './Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Smap from './Smap';
import axios from 'axios'
class Seek extends Component {
    constructor(props) {
        super(props);
        this.state = { Users:[], seektext:"" }
        this.handleSeekChange=this.handleSeekChange.bind(this);
        this.requestHelp=this.requestHelp.bind(this);
        this.checkLogin=this.checkLogin.bind(this);
    }
    componentDidMount(){
        if(!this.checkLogin()){
            console.log("unauthenticated");
            this.props.history.push("/GetStarted");
        }
        /*else{
            axios.get(`http://127.0.0.1:8000/api/${localStorage.getItem('username')}/seeklist`,{
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
        }*/
    }
    checkLogin(){
        if(localStorage.getItem('username')===null){
            return false;
        }
        return true;
    }
    handleSeekChange(e){
        if(e.target.value.length<=300){
            this.setState({
                seektext: e.target.value,
            })
        }
        else{
            alert("Limit Exceeded...");
        }
    }
    requestHelp(e){
        axios.post(`http://127.0.0.1:8000/api/${localStorage.getItem('username')}/seek/`,{
            seek_text: this.state.seektext,
        },{
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            alert("successful");
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
        this.setState({
            seektext:"",
        })
    }
    render(){ 
        return (
            <div className="Seek-prnt">
                <div className="Seek-cntr">
                    <div className="Seek-left">
                        <Navbar />
                    </div>
                    <div className="Seek-center">
                    <h2>How can we help you?</h2> 
                    <textarea placeholder="Enter your request......." type="text" value={this.state.seektext} onChange={this.handleSeekChange} style={{resize: "none",width: "80%", height:"70%", fontSize: "27px"}} ></textarea>
                    <button className="seek-button" onClick={this.requestHelp}>Confirm</button>
                    </div>
                    <div className="Seek-right">
                        <Smap type={"seek"} />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Seek;