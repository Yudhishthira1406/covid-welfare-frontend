import React,{ Component } from 'react';
import './MyProfile.css';
import Navbar from './Navbar'
import { withRouter } from "react-router";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams
} from "react-router-dom";
import axios from 'axios';
class MyProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            User:"",
        }
    }
    componentDidMount(){
        const username = this.props.match.params.username;
        const token=this.props.match.params.token;
        console.log(token,username);
        axios.get(`http://127.0.0.1:8000/api/${username}`,{
            headers: {
                'Authorization': `Token ${token}`
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
    }
    render(){ 
        return (
            
            <div className="MyProfile-prnt">
                <div className="MyProfile-cntr">
                    <div className="MyProfile-left">
                        <Navbar />
                    </div>
                    <div className="MyProfile-center">
                        <div className="MyProfile-picture">

                        </div>
                        <div className="MyProfile-details">
                            <p>Name:<br />xxxx<br />contact number:<br />xxxx<br />Blood Group<br />xxxx<br />Address<br />xxxx<br />Occupation<br />xxxx<br /></p>
                            <button className="MyProfile-button">
                                Edit
                            </button>
                        </div>
                        <div>
                            
                        </div>
                    </div>
                    <div className="MyProfile-right">
                        <div className="MyProfile-motivation">
                            <p>"----------------------------------------------------------------------------------------------High Level Motivation------------------------------------------------------------------------------------"</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default withRouter(MyProfile);