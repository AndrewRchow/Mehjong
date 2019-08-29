import React from 'react';
import { BrowserRouter as Router, Route, HashRouter } from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Pages/Landing';
import SessionsPage from '../Pages/Sessions';


import * as Routes from '../../constants/routes';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HashRouter>
        <div>
          <div>
            <Navigation forwardRef={node => this.node = node} />
            <hr />
          </div>
          <div onClick={this.handleContainerClick}>
            <Route exact path={Routes.Landing} component={LandingPage} />
            <Route exact path={Routes.Sessions} component={SessionsPage} />
          </div>
        </div>
      </HashRouter>
    );
  }
}


export default App;
