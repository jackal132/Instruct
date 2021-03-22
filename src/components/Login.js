import '../css/Login.css';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
    let history = useHistory();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {

        window.sessionStorage.getItem('_id') ? setLoggedIn(true) : setLoggedIn(false);

        if(loggedIn){
            history.push('/room');
        }
    },[loggedIn, history]);

    const onFacebook = async (response) => {
        await axios.post('/login/facebook', response)
            .then(res => {
                window.sessionStorage.setItem('_id', res.data.loginInfo._id);
                window.sessionStorage.setItem('username', res.data.loginInfo.username);
                history.push('/room');
            });
    }

    const onGoogleSuccess = async (result) => {
        await axios.post('/login/google', result.profileObj)
            .then(res => {
                window.sessionStorage.setItem('_id', res.data.loginInfo._id);
                window.sessionStorage.setItem('username', res.data.loginInfo.username);
                history.push('/room');
            });
    }

    const onGoogleFailure = (result) => {
        console.log(result);
    }

    return (
        <div className="loginMain">
            <div className="loginForm">
                <div className="loginTitle">Instruct</div>

                <FacebookLogin
                    appId="205833144355071"
                    callback={onFacebook}
                    render={renderProps => (
                        <div className="item facebookBtn" onClick={renderProps.onClick}>Login with Facebook</div>
                    )}
                />

                <GoogleLogin
                    clientId="257288724463-01k92lm3153irho0i97p0cnj2tuqt2qc.apps.googleusercontent.com"
                    onSuccess={result => onGoogleSuccess(result)}
                    onFailure={result => onGoogleFailure(result)}
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => (
                        <div className="item googleBtn" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with Google</div>
                    )}
                />

            </div>
        </div>
    );
};

export default Login;