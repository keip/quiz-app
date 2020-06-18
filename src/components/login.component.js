import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

const Login = () => {
    const responseFacebook = (response) => {
        axios.post('http://localhost:5000/user/register/', {
            name: response.name,
            email: response.email,
            facebookId: response.id
        });
    }

    return (
        <div className="App">
            <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>
            <FacebookLogin
                appId="679656046214827"
                fields="name,email"
                callback={responseFacebook}
            />
        </div>
    );
}

export default Login;