import React,{ Component } from 'react';
import './MyProfile.css';
import Navbar from './Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
class MyProfile extends Component {
    constructor(props){
        super(props);
        this.state = {}
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
 
export default MyProfile;