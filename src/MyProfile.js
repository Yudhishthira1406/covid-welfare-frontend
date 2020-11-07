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
            User:"",username:"",token:"",
        }
        this.handleEdit=this.handleEdit.bind(this);
    }
    componentDidMount(){
        if(localStorage.getItem('username')===null){
            console.log("unauthenticated");
            this.props.history.push("/GetStarted");
        }
        else{
        axios.get(`http://127.0.0.1:8000/api/${localStorage.getItem('username')}`,{
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })      
        .then(response => {
            this.setState({
                User:response.data,
            })
            console.log(this.state.User);
        })
        .catch(error => {
            console.log(error);
        })
        }
    }
    handleEdit(){
        this.props.history.push(`/EditProfile/${localStorage.getItem('username')}`)
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
                            {localStorage.getItem('username')[0].toUpperCase()}
                        </div>
                        <div className="MyProfile-details">
                            <p><h1>Name:</h1><br />{localStorage.getItem('username')}<br /><h1>contact number:</h1><br />{this.state.User.contact}<br /><h1>Blood Group:</h1><br />{this.state.User.blood_group}<br /><h1>Address:</h1><br />{this.state.User.address}<br /><h1>Occupation:</h1><br />{this.state.User.occupation}<br /></p>
                            <button className="MyProfile-button" onClick={this.handleEdit}>
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