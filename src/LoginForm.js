import { Component } from "react";

class LoginForm extends Component {
    constructor(props) {
    super(props);
    this.state = { user: '' };
    }

  render() {
    /* TODO: create a simple login form that collects username and and email, and lets parent component know when form has been submitted */
    return (
        <>
        <input onChange={(e) => this.setState({ user: e.target.value })} type="text" placeholder="email@domain.com"/>
        <button onClick={() => this.props.loginHandler(this.state.user)}>Login</button>
      </>
    );
  }
};

export default LoginForm;
