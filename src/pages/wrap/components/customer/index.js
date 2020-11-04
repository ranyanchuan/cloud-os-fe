import React, { Component, } from 'react';
import Icon from 'pub-comp/icon';

import { wrap } from "./index.css";

class Customer extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentDidMount() {

	}

	openCustomer = () => {
		// 此处云客服做的很 -***- ， 需要调用dom的click事件
		const domId = document.getElementById("message");
		if (domId) {
			domId.click();
		}
	}

	render() {
		return (
			window._IUAPPREMISESFLAG ? null :
				<div className={`${wrap} tc`}>
					<Icon font="service" onClick={this.openCustomer} title="云客服" />
				</div>
		);
	}
}

export default Customer;
