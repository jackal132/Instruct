import { Component } from "react";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
// import axios from 'axios';


class Test extends Component {

    responseFacebook = (response) => {
        console.log(response);
    }

    responseGoogle = (response) => {
        console.log(response);
    };

    failGoogle = (response) => {
        console.log(response);
    };

    // state = {
    //     message : 'CallApi'
    // }

    // callApi = async () => {
    //     axios.get('/api', {})
    //     .then(res => {
    //         this.setState({message:res.data.message});
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }

    render(){
        return (
            <div>
                <GoogleLogin
                    clientId="257288724463-01k92lm3153irho0i97p0cnj2tuqt2qc.apps.googleusercontent.com"
                    onSuccess={result => this.responseGoogle(result)}
                    onFailure={result => this.failGoogle(result)}
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => (
                        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>GoogleButton</button>
                    )}
                />

                <FacebookLogin
                    appId="205833144355071"
                    autoLoad
                    callback={this.responseFacebook}
                    render={renderProps => (
                        <button onClick={renderProps.onClick}>FacebookButton</button>
                    )}
                />
            </div>
            // <button onClick={this.callApi}>{this.state.message}</button>
        )
    }
}

export default Test;