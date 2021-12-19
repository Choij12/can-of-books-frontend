import React from 'react';
import { withAuth0 } from 'auth0/auth0-react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Header.css';
import LogoutButton from './LogoutButton';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        {/* Done: if the user is logged in, render a navigation link to profile page */}
        {this.props.auth0.isAuthenticated && <NavItem><Link to="/profile" className="nav-link">Profile</Link></NavItem>}
        {/* TODO: if the user is logged in, render the `LogoutButton` */}
        <NavItem><LogoutButton/></NavItem>
      </Navbar>
    )
  }
}

export default withAuth0(Header);