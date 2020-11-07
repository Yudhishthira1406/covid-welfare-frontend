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
        this.state = { Users:[] }
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
    render(){ 
        return (
            <div className="Seek-prnt">
                <div className="Seek-cntr">
                    <div className="Seek-left">
                        <Navbar />
                    </div>
                    <div className="Seek-center">
                    <h2>Providers in the HOUSE....</h2>
                        {this.state.Users.map(User =>(
                            <div className="seek-users">
                                {User.username[0].toUpperCase()+User.username.slice(1)}<br />
                            </div>
                        ))}
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