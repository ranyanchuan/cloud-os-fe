import React, { Component } from 'react';
import CreateHeader from './header';
import Establish from 'pages/establish';

class Create extends Component {

  render() {

    return (
      <div className="um-win">
        <CreateHeader />
        <div className="diwork-content-fixed um-content">
          <Establish from="create" />
        </div>
      </div>
    )
  }
}

export default Create;
