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

    authors = ["Marie Curie","Anonymous","Swami Vivekanand","Thich Nhat Hanh","Etienne de Grellet"]
    quotes = ["Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.   -Marie Curie","Those who have an enthusiasm and interest in life, stay young - no matter how 'old' they get. It is these people who often stay the healthiest and live the longest too.  -Anonymous",
                "The cheerful mind perseveres, and the strong mind hews its way through a thousand difficulties.....  -Swami Vivekanand","Keeping your body healthy is an expression of gratitude to the whole cosmos- the trees, the clouds, everything.  -Thich Nhat Hanh",
                "I shall pass this way but once; any good that I can do or any kindness I can show to any human being; let me do it now...  -Etienne de Grellet"]
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
                            <p className="attribute-para"><span className="profile-atrribute">Name:  </span><br/>{localStorage.getItem('username')[0].toUpperCase()+localStorage.getItem('username').slice(1)}</p>
                            <p className="attribute-para"><span className="profile-atrribute">Contact:  </span><br/>{this.state.User.contact}</p>
                            <p className="attribute-para"><span className="profile-atrribute">Blood Group:  </span><br/>{this.state.User.blood_group}</p>
                            <p className="attribute-para"><span className="profile-atrribute">Address:  </span><br/>{this.state.User.address}</p>
                            <p className="attribute-para"><span className="profile-atrribute">Occupation:  </span><br/>{this.state.User.occupation}</p>    
                            {/* <br></br> */}
                            {/* <button className="MyProfile-button" onClick={this.handleEdit}>
                                Edit
                            </button> */}
                        </div>
                        <div>
                            
                        </div>
                    </div>
                    <div className="MyProfile-right">
                        <div className="MyProfile-motivation">
                        <button className="MyProfile-button" onClick={this.handleEdit}>
                                Edit
                         </button>
                            {/* <p>
                            </p> */}
                            <p className="motivational-para">{this.quotes[Math.floor(Math.random()*4)]}</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}
 
export default withRouter(MyProfile);