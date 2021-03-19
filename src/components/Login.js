import '../css/Login.css';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const Login = () => {

    const onFacebook = (response) => {
        axios.post('/login/facebook', response)
            .then(res => {
                console.log(res);
            });
    }

    const onGoogleSuccess = (result) => {
        console.log(result);
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
                    autoLoad
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