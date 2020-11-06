import React,{ Component } from 'react'
import './GetStarted.css'
import GoogleBtn from './GoogleBtn.js'
class GetStarted extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
                <div className="container">
                    <div className="signup">
                        <h1>SIGN UP</h1>
                        <form>
                            <label>Username</label><br />
                            <input /><br />
                            <label>Email id</label><br />
                            <input /><br />
                            <label>Password</label><br />
                            <input /><br />
                        </form>
                        <button className="b1">SIGN UP</button>
                        <p>Or</p>
                        <button className="b2">SIGNUP WITH GOOGLE</button>
                    </div>
                    <div className="login">
                        <h1>LOG IN</h1>
                        <form>
                            <label>Email id</label><br />
                            <input /><br />
                            <label>Password</label><br />
                            <input /><br />
                        </form>
                        <button className="b3">LOG IN</button>
                        <p>Or</p>
                        <GoogleBtn />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default GetStarted;