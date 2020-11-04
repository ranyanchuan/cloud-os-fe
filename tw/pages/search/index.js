import React, { Component } from 'react';
import SearchResult from './searchResult';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="diworkcontent" id="Search">
        <SearchResult />
      </div>
    );
  }
}

export default Search;
