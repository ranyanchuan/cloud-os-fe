import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';

@onClickOutside
class SearchWrap extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {

	}

	handleClickOutside(e) {
		e.stopPropagation();
		this.props.closeSearchWrap()
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}
export default SearchWrap;

