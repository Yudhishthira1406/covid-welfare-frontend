import React,{ Component } from 'react';
import './Provide.css';
import Navbar from './Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Pmap from './Pmap';
class Provide extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        if(localStorage.getItem('username')===null){
            console.log("unauthenticated");
            this.props.history.push("/GetStarted");
        }
        else{
            
        }
    }
    render(){ 
        return (
            <div className="Provide-prnt">
                <div className="Provide-cntr">
                    <div className="Provide-left">
                        <Navbar />
                    </div>
                    <div className="Provide-center">
                        
                    </div>
                    <div className="Provide-right">
                        <Pmap />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Provide;