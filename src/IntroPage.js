import React,{ Component } from 'react'
import {Link} from 'react-router-dom'
import './IntroPage.css'
import doctors from './doctors.png'
class IntroPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <div className="container">
                    <div className="left">
                        <h1>Covid WelFare</h1>
                        <p>/--------------------------------------------dummy-text--------
                            ---------------------------------------------------------------
                            ---------------------------------------------------------------
                            ---------------------------------------------------------------
                            ---------------------------------------------------------------
                            ---------------------------------------------------------------
                            ---------------------------------------------------------------/</p>
                        <Link to="/GetStarted">
                            <button>Get Started</button>
                        </Link>
                    </div>
                    <div className="right">
                        <img src={doctors} />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default IntroPage;