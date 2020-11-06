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

                        </div>
                        <div className="MyProfile-details">
                            <p>Name:<br />{localStorage.getItem('username')}<br />contact number:<br />{this.state.User.contact}<br />Blood Group:<br />{this.state.User.blood_group}<br />Address:<br />{this.state.User.address}<br />Occupation:<br />{this.state.User.occupation}<br /></p>
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