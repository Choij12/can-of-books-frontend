import { Component } from 'react'
import LoginForm from './LoginForm'

export default class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = { clicked: false };
      }
    

  render() {

    /* TODO: Render a button with label 'Log In'. When the button is clicked then show LoginForm instead */
    return (
        this.state.clicked ? <LoginForm loginHandler={this.props.loginHandler}/> : <button onClick={() => this.setState({ clicked: true })}>Log in</button>
    )
  }
}