import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as Routes from '../../constants/routes';
import { Navbar, Nav } from 'react-bootstrap';

const menuItems = [
  ['Sessions', Routes.Sessions]
];

class NavigationBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navExpanded: false
    }
  }

  setNavExpanded = (expanded) => {
    this.setState({ navExpanded: expanded });
    document.addEventListener('click', this.handleDocumentClick, true);
  };

  closeNav = () => {
    this.setState({ navExpanded: false });
    document.removeEventListener('click', this.handleDocumentClick, true);
  };

  handleDocumentClick = (e) => {
    const container = this._element;
    if (e.target !== container && !container.contains(e.target)) {
      this.closeNav();
    }
  }

  render() {
    return (
      <div ref={(c) => (this._element = c)}>
        <Navbar collapseOnSelect expand="md" bg="light" variant="light" fixed="top"
          onToggle={this.setNavExpanded} expanded={this.state.navExpanded}>
          <Navbar.Brand onClick={this.closeNav} href="#/">AAAA</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {menuItems.map(([menuItem, route]) =>
                <Nav.Link href={"#" + route} key={menuItem}
                  className={this.props.location.pathname === route ? `activated` : ``}
                  >
                  {menuItem}
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const Navigation = withRouter(withFirebase(NavigationBase));

export default Navigation;
