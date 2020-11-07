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
                        <p className="intro-desp">As the nation is gripped in a crippling pandemic, our fellow countrymen are facing various problems every day. CovidWelfare is a social platform where people with needs and people with means to provide can interact so that we can stay strong in these trying times.</p>
                        <Link to="/GetStarted">
                            <button className="getstartedButton">Get Started</button>
                        </Link>
                    </div>
                    <div className="rightsvg">
                        <img src={doctors} />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default IntroPage;