import React, { Component } from 'react';
import Header from './header';
import CreateEnter from 'pages/createenter';

class Ce extends Component {

  render() {

    return (
      <div className="um-win">
        <Header />
        <div className="diwork-content-fixed um-content">
          <CreateEnter />
        </div>
      </div>
    )
  }
}

export default Ce;
