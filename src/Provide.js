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
import Smap from './Smap';
class Provide extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
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
                        <Smap />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Provide;