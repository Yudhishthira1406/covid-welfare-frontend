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
class Seek extends Component {
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
            <div className="Seek-prnt">
                <div className="Seek-cntr">
                    <div className="Seek-left">
                        <Navbar />
                    </div>
                    <div className="Seek-center">
                        
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