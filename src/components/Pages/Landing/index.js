import React, { Component } from 'react';
import { withFirebase } from '../../Firebase';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  };

  render() {
    return (
      <div>
        landing
      </div>
    )
  }
}

export default withFirebase(Landing);
