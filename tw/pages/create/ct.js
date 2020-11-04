import React, { Component } from 'react';
import Header from './header';
import CreateTeam from 'pages/createteam';

class Ct extends Component {

  render() {

    return (
      <div className="um-win">
        <Header />
        <div className="diwork-content-fixed um-content">
          <CreateTeam />
        </div>
      </div>
    )
  }
}

export default Ct;
