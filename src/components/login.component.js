import React from 'react';
import FacebookLogin from 'react-facebook-login';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

const Login = () => {
    const responseFacebook = (response) => {
        axios.post('http://localhost:5000/user/register/', {
            name: response.name,
            email: response.email,
            facebookId: response.id,
            accessToken: response.accessToken
        }).then(res => {
            cookies.set('user_id', res.data.userId);
            window.location = '/';
        });
        cookies.set('access_token', response.accessToken);
    }

    return (
        <div className="App">
            <h1>LOGIN WITH FACEBOOK</h1>
            <FacebookLogin
                appId="679656046214827"
                fields="name,email"
                callback={responseFacebook}
            />
        </div>
    );
}

export default Login;