import React from 'react';
import FacebookLogin from 'react-facebook-login';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";

const cookies = new Cookies();

const Login = () => {
    const history = useHistory();
    const responseFacebook = (response) => {
        if (response.accessToken) {
            axios.post(`${process.env.API_URI}user/register/`, {
                name: response.name,
                email: response.email,
                facebookId: response.id,
                accessToken: response.accessToken
            }).then(res => {
                cookies.set('user_id', res.data.userId);
                history.push('/');
            });
            cookies.set('access_token', response.accessToken);
        } else {
            alert('Login failed!');
        }
    }

    return (
        <Grid container justify="center" alignItems="center">
            <FacebookLogin
                appId="679656046214827"
                fields="name,email"
                callback={responseFacebook}
            />
        </Grid>
    );
}

export default Login;