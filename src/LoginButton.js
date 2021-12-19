// import { Component } from 'react'
// import LoginForm from './LoginForm'
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  return !isAuthenticated &&  (
    /* Done: Render a button with label 'Log In'. When the button is clicked then show LoginForm instead */
    <button onClick={loginWithRedirect}>Log in</button>
    )
};

export default LoginButton;