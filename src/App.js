import React from 'react';
import './App.css';

import FacebookLogin from 'react-facebook-login';

const App = () => {
  const responseFacebook = (response) => {
    console.log(response);
  }

  return (
    <div className="App">
      <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>
      <FacebookLogin
        appId="679656046214827"
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </div>
  );
}

export default App;
