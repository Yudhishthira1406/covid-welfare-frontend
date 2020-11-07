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
        this.handleConfirm=this.handleConfirm.bind(this);
    }
    componentDidMount(){
        if(localStorage.getItem('username')===null){
            console.log("unauthenticated");
            this.props.history.push("/GetStarted");
        }
        else{
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
        }
    }
    handleSeekChange(e){
        this.setState({
            seektext: e.target.value,
        })
    }
    handleConfirm(e){
        axios.post(`http://127.0.0.1:8000/api/${localStorage.getItem('username')}/seek/`,{
            seek_text: this.state.seektext,
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
                    <input type="text" value={this.state.seektext} onChange={this.handleSeekChange}></input>
                    <button className="seek-button" onClick={this.handleConfirm}>Confirm</button>
                    </div>
                    <div className="Seek-right">
                        <Smap />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Seek;